/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { singleTerritory } = require('../mocks/territories')
const { singleLocation } = require('../mocks/locations')
const { setTerritoryValues, checkTerritoryUnique } = require('../../middlewares/territories')

chai.use(sinonChai)

const { expect } = chai

describe('Middlewares - Territories', () => {
  let response
  let sandbox
  let stubbedFindOneLocation
  let stubbedFindOneTerritory
  let stubbedSend
  let stubbedStatus
  let stubbedStatusDotSend
  let stubbedNext

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOneLocation = sandbox.stub(models.Locations, 'findOne')
    stubbedFindOneTerritory = sandbox.stub(models.Territories, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()
    stubbedNext = sandbox.stub()

    response = {
      send: stubbedSend,
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

  describe('setTerritoryValues', () => {
    it('Prepares the values to be used to save a territory to a location. Sanitizes the body and creates a slug and name from it. Uses the location id from the route as the locationId. Saves all of these variables to locals.', async () => {
      const request = { params: { slug: 'seras' }, body: 'The Trench', locals: {} }

      stubbedFindOneLocation.returns(singleLocation)

      await setTerritoryValues(request, response, stubbedNext)

      expect(stubbedFindOneLocation).to.have.been.calledWith({ where: { slug: 'seras' } })
      expect(request.locals.name).to.equal('The Trench')
      expect(request.locals.slug).to.equal('the-trench')
      expect(request.locals.locationId).to.equal(1)
      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 404 status when no location is found from the slug provided in the route', async () => {
      const request = { params: { slug: 'the-trench' }, body: 'something', locals: {} }

      stubbedFindOneLocation.returns(null)

      await setTerritoryValues(request, response, stubbedNext)

      expect(stubbedFindOneLocation).to.have.been.calledWith({ where: { slug: 'the-trench' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No location with the slug of "the-trench" found')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs retrieving the fields', async () => {
      const request = { params: { slug: 'the-trench' }, body: 'something' }

      stubbedFindOneLocation.throws('ERROR')

      await setTerritoryValues(request, response, stubbedNext)

      expect(stubbedFindOneLocation).to.have.been.calledWith({ where: { slug: 'the-trench' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to set territory locals, please try again')
      expect(stubbedNext).to.have.callCount(0)
    })
  })

  describe('checkTerritoryUnique', () => {
    it('checks a territory slug and location id in locals to see if the territory is unique', async () => {
      const request = { locals: { slug: 'adamantis', locationId: '11' } }

      stubbedFindOneTerritory.returns(null)

      await checkTerritoryUnique(request, response, stubbedNext)

      expect(stubbedFindOneTerritory).to.have.been.calledWith({ where: { slug: 'adamantis', locationId: '11' } })
      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status when the territory already exists', async () => {
      const request = { locals: { slug: 'northern-path', locationId: '1' } }

      stubbedFindOneTerritory.returns(singleTerritory)

      await checkTerritoryUnique(request, response, stubbedNext)

      expect(stubbedFindOneTerritory).to.have.been.calledWith({ where: { slug: 'northern-path', locationId: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Territory "northern-path" already exists')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs retrieving the territory list', async () => {
      const request = { locals: { slug: 'northern-path', locationId: '1' } }

      stubbedFindOneTerritory.throws('ERROR!')

      await checkTerritoryUnique(request, response, stubbedNext)

      expect(stubbedFindOneTerritory).to.have.been.calledWith({ where: { slug: 'northern-path', locationId: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve territory list, please try again')
      expect(stubbedNext).to.have.callCount(0)
    })
  })
})
