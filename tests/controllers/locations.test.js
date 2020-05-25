/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { locationList, singleLocation, patchedLocation } = require('../mocks/locations')
const { singleTerritory } = require('../mocks/territories')
const {
  getAllLocations, getLocationBySlug, saveNewTerritoryToLocation, patchLocationThreat, deleteTerritory
} = require('../../controllers/locations')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - Locations', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindOneTerritory
  let stubbedFindAll
  let stubbedUpdate
  let stubbedDestroy
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Locations, 'findAll')
    stubbedFindOne = sandbox.stub(models.Locations, 'findOne')
    stubbedFindOneTerritory = sandbox.stub(models.Territories, 'findOne')
    stubbedCreate = sandbox.stub(models.Territories, 'create')
    stubbedUpdate = sandbox.stub(models.Locations, 'update')
    stubbedDestroy = sandbox.stub(models.Territories, 'destroy')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getAllLocations', () => {
    it('retrieves a list of locations from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(locationList)

      await getAllLocations({}, response)

      expect(stubbedFindAll).to.have.been.called.with({ include: { model: models.Territories } })
      expect(stubbedSend).to.have.been.calledWith(locationList)
    })

    it('returns a 500 status when an error occurs retrieving the locations', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllLocations({}, response)

      expect(stubbedFindAll).to.have.been.called.with({ include: { model: models.Territories } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve location list, please try again')
    })
  })

  describe('getLocationBySlug', () => {
    it('retrieves the location associated with the provided slug from the database and calls response.send() with it', async () => {
      const request = { params: { slug: 'seras' } }

      stubbedFindOne.returns(singleLocation)

      await getLocationBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ include: { model: models.Territories } },
        { where: { slug: 'seras' } })
      expect(stubbedSend).to.have.been.calledWith(singleLocation)
    })

    it('returns a 404 status when no location is found', async () => {
      const request = { params: { slug: 'greensea' } }

      stubbedFindOne.returns(null)

      await getLocationBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ include: { model: models.Territories } },
        { where: { slug: 'greensea' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No location with the slug of "greensea" found')
    })

    it('returns a 500 status when an error occurs retrieving the location by slug', async () => {
      const request = { params: { slug: 'greensea' } }

      stubbedFindOne.throws('ERROR!')

      await getLocationBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ include: { model: models.Territories } },
        { where: { slug: 'greensea' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve location, please try again')
    })
  })

  describe('saveNewTerritoryToLocation', () => {
    it('accepts new location details and saves them as a new location in the database, returning the saved record with a 201 status', async () => {
      const request = { body: singleTerritory }

      stubbedCreate.returns(singleTerritory)

      await saveNewTerritoryToLocation(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleTerritory)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleTerritory)
    })

    it('returns a 500 status when an error occurs saving the new location', async () => {
      const request = { body: singleTerritory }

      stubbedCreate.throws('ERROR!')

      await saveNewTerritoryToLocation(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleTerritory)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save location, please try again')
    })
  })

  describe('patchLocationThreat', () => {
    it('Takes the "threat" integer in locals and assigns it to the location referenced by slug in the route, returning the patched location', async () => {
      const request = { params: { slug: 'seras' }, locals: { threat: 90 } }

      stubbedFindOne.returns(singleLocation)
      stubbedUpdate.returns(patchedLocation)

      await patchLocationThreat(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'seras' } })
      expect(stubbedUpdate).to.have.been.calledWith({ threat: 90 })
      expect(stubbedSend).to.have.been.calledWith(patchedLocation)
    })

    it('returns a 404 status when no location is found with the slug in the route', async () => {
      const request = { params: { slug: 'the-trench' }, locals: { threat: 90 } }

      stubbedFindOne.returns(null)

      await patchLocationThreat(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'the-trench' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No location with the slug of "the-trench" found')
    })

    it('returns a 500 status when an error occurs patching the location', async () => {
      const request = { params: { slug: 'ashlocus' }, locals: { threat: 90 } }

      stubbedFindOne.throws('ERROR!')

      await patchLocationThreat(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'ashlocus' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch location threat, please try again')
    })
  })

  describe('deleteTerritory', () => {
    it('Deletes a territory belonging to the location referenced by slug and territorySlug respectively in the route from the database', async () => {
      const request = { params: { slug: 'seras', territorySlug: 'eastern-border' } }

      stubbedFindOne.returns(singleLocation)
      stubbedFindOneTerritory.returns(singleTerritory)

      await deleteTerritory(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'seras' } })
      expect(stubbedFindOneTerritory).to.have.been.calledWith({
        where: { slug: 'eastern-border', locationId: 1 }
      })
      expect(stubbedDestroy).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(204)
    })


    it('returns a 404 status when no location is found with the slug in the route', async () => {
      const request = { params: { slug: 'gris', territorySlug: 'eastern-border' } }

      stubbedFindOne.returns(null)

      await deleteTerritory(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'gris' } })
      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No location with the slug of "gris" found')
    })

    it('returns a 404 status when no territory is found with the territorySlug in the route', async () => {
      const request = { params: { slug: 'seras', territorySlug: 'talus' } }

      stubbedFindOne.returns(singleLocation)
      stubbedFindOneTerritory.returns(null)

      await deleteTerritory(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'seras' } })
      expect(stubbedFindOneTerritory).to.have.been.calledWith({
        where: { slug: 'talus', locationId: 1 }
      })
      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No territory with the slug of "talus" found in seras')
    })

    it('returns a 500 status when an error occurs deleting the location', async () => {
      const request = { params: { slug: 'seras', territorySlug: 'northern-path' } }

      stubbedFindOne.throws('ERROR!')

      await deleteTerritory(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'seras' } })
      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete location territory, please try again')
    })
  })
})
