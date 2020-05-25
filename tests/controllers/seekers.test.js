/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { singleSeeker, seekerList, postedSeeker, patchedSeeker } = require('../mocks/seekers')
const { singleTitle, assignedTitle } = require('../mocks/titles')
const {
  getAllSeekersWithTitles, getSeekersByTitleId, getSeekerByIdWithTitles,
  saveNewSeeker, assignSeekerTitle, patchSeeker,
  deleteSeeker, deleteSeekerTitle,
} = require('../../controllers/seekers')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - Seekers', () => {
  let response
  let sandbox
  let stubbedCreateSeeker
  let stubbedFindOrCreateTitle
  let stubbedFindOrCreateSeekerTitle
  let stubbedFindOneSeeker
  let stubbedFindOneTitle
  let stubbedFindAll
  let stubbedUpdate
  let stubbedDestroySeeker
  let stubbedDestroySeekerTitle
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Seekers, 'findAll')
    stubbedFindOneSeeker = sandbox.stub(models.Seekers, 'findOne')
    stubbedFindOneTitle = sandbox.stub(models.Titles, 'findOne')
    stubbedCreateSeeker = sandbox.stub(models.Seekers, 'create')
    stubbedFindOrCreateTitle = sandbox.stub(models.Titles, 'findOrCreate')
    stubbedFindOrCreateSeekerTitle = sandbox.stub(models.SeekersTitles, 'findOrCreate')
    stubbedUpdate = sandbox.stub(models.Seekers, 'update')
    stubbedDestroySeeker = sandbox.stub(models.Seekers, 'destroy')
    stubbedDestroySeekerTitle = sandbox.stub(models.SeekersTitles, 'destroy')

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

  describe('getAllSeekersWithTitles', () => {
    it('retrieves a list of seekers from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(seekerList)

      await getAllSeekersWithTitles({}, response)

      expect(stubbedFindAll).to.have.been.called.with({ include: { model: models.Titles } })
      expect(stubbedSend).to.have.been.calledWith(seekerList)
    })

    it('returns a 500 status when an error occurs retrieving the seekers', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllSeekersWithTitles({}, response)

      expect(stubbedFindAll).to.have.been.called.with({ include: { model: models.Titles } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve seeker list, please try again')
    })
  })

  describe('getSeekersByTitleId', () => {
    it('retrieves the seekers associated with the provided title id from the database and calls response.send() with them', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOneTitle.returns(singleTitle)
      stubbedFindAll.returns(seekerList)

      await getSeekersByTitleId(request, response)

      expect(stubbedFindOneTitle).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedFindAll).to.have.been.calledWith({ include: { model: models.Titles, where: { id: '1' } } })
      expect(stubbedSend).to.have.been.calledWith(seekerList)
    })

    it('returns a 404 status when no title is found with the id provided in the route', async () => {
      const request = { params: { id: '9' } }

      stubbedFindOneTitle.returns(null)

      await getSeekersByTitleId(request, response)

      expect(stubbedFindOneTitle).to.have.been.calledWith({ where: { id: 9 } })
      expect(stubbedFindAll).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No title with the id of "9" found')
    })

    it('returns a 404 status when no seekers are found with the title id provided in the route', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOneTitle.returns(singleTitle)
      stubbedFindAll.returns([])

      await getSeekersByTitleId(request, response)

      expect(stubbedFindOneTitle).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedFindAll).to.have.been.calledWith({ include: { model: models.Titles, where: { id: '1' } } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No seekers with the title of id "1" found')
    })

    it('returns a 500 status when an error occurs retrieving the seeker list', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOneTitle.throws('ERROR!')

      await getSeekersByTitleId(request, response)

      expect(stubbedFindOneTitle).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedFindAll).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve seekers by title id, please try again')
    })
  })

  describe('getSeekerByIdWithTitles', () => {
    it('retrieves the seeker associated with the provided id from the database and calls response.send() with it', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOneSeeker.returns(singleSeeker)

      await getSeekerByIdWithTitles(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ include: { model: models.Titles }, where: { id: '1' } })
      expect(stubbedSend).to.have.been.calledWith(singleSeeker)
    })

    it('returns a 404 status when no seeker is found', async () => {
      const request = { params: { id: '9' } }

      stubbedFindOneSeeker.returns(null)

      await getSeekerByIdWithTitles(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ include: { model: models.Titles }, where: { id: '9' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No seeker with the id of "9" found')
    })

    it('returns a 500 status when an error occurs retrieving the seeker by id', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOneSeeker.throws('ERROR!')

      await getSeekerByIdWithTitles(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ include: { model: models.Titles }, where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve seeker, please try again')
    })
  })

  describe('saveNewSeeker', () => {
    it('accepts new seeker details and saves them as a new seeker in the database, returning the saved record with a 201 status', async () => {
      const request = { body: postedSeeker }

      stubbedCreateSeeker.returns(postedSeeker)

      await saveNewSeeker(request, response)

      expect(stubbedCreateSeeker).to.have.been.calledWith(postedSeeker)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedSeeker)
    })

    it('returns a 500 status when an error occurs saving the new seeker', async () => {
      const request = { body: postedSeeker }

      stubbedCreateSeeker.throws('ERROR!')

      await saveNewSeeker(request, response)

      expect(stubbedCreateSeeker).to.have.been.calledWith(postedSeeker)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save seeker, please try again')
    })
  })

  describe('assignSeekerTitle', () => {
    it('accepts a seeker title name and assigns it to the seeker referenced by the id in the route ,returning the seeker', async () => {
      const request = { params: { id: '1' }, body: { name: 'Flight' } }

      stubbedFindOneSeeker.returns(singleSeeker)
      stubbedFindOrCreateTitle.returns(assignedTitle)
      stubbedFindOrCreateSeekerTitle.returns({ seekerId: 1, titleId: 6 })

      await assignSeekerTitle(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedFindOrCreateTitle).to.have.been.calledWith({ where: { name: 'Flight' } })
      expect(stubbedFindOrCreateSeekerTitle).to.have.been.calledWith({ where: { seekerId: '1', titleId: '6' } })
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleSeeker)
    })

    it('returns a 404 status when no seeker is found with the id in the route', async () => {
      const request = { params: { id: '1' }, body: { name: 'Flight' } }

      stubbedFindOneSeeker.returns(null)

      await assignSeekerTitle(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedFindOrCreateTitle).to.have.been.calledWith({ where: { name: 'Flight' } })
      expect(stubbedFindOrCreateTitle).to.have.callCount(0)
      expect(stubbedFindOrCreateSeekerTitle).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedSend).to.have.been.calledWith('No seeker with the id of "$1" found')
    })

    it('returns a 500 status when an error occurs replacing the referenced seeker', async () => {
      const request = { params: { id: '1' }, body: { name: 'Flight' } }

      stubbedFindOneSeeker.throws('ERROR')

      await assignSeekerTitle(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedFindOrCreateTitle).to.have.callCount(0)
      expect(stubbedFindOrCreateSeekerTitle).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedSend).to.have.been.calledWith('Unable to assign seeker title, please try again')
    })
  })

  describe('patchSeeker', () => {
    it('accepts seeker property and a new value for that property and patches the seeker referenced by id in the route, returning the patched seeker', async () => {
      const request = { params: { id: '2', property: 'age' }, body: '90' }

      stubbedFindOneSeeker.returns(singleSeeker)
      stubbedUpdate.returns(patchedSeeker)

      await patchSeeker(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '2' } })
      expect(stubbedUpdate).to.have.been.calledWith({ 'age': '90' })
      expect(stubbedSend).to.have.been.calledWith(patchedSeeker)
    })

    it('returns a 404 status when no seeker is found with the id in the route', async () => {
      const request = { params: { id: '99', property: 'age' }, body: '90' }

      stubbedFindOneSeeker.returns(null)

      await patchSeeker(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '99' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No seeker with the id of "99" found')
    })

    it('returns a 500 status when an error occurs patching the seeker', async () => {
      const request = { params: { id: '99', property: 'age' }, body: '90' }

      stubbedFindOneSeeker.throws('ERROR!')

      await patchSeeker(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '99' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch seeker code, please try again')
    })
  })

  describe('deleteSeeker', () => {
    it('Deletes a seeker referenced by id in the route from the database', async () => {
      const request = { params: { id: '2' } }

      stubbedFindOneSeeker.returns(singleSeeker)

      await deleteSeeker(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '2' } })
      expect(stubbedDestroySeeker).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(204)
    })


    it('returns a 404 status when no seeker is found with the code in the route', async () => {
      const request = { params: { id: '99' } }

      stubbedFindOneSeeker.returns(null)

      await deleteSeeker(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '99' } })
      expect(stubbedDestroySeeker).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No seeker with the id of "99" found')
    })

    it('returns a 500 status when an error occurs deleting the seeker', async () => {
      const request = { params: { id: '2' } }

      stubbedFindOneSeeker.throws('ERROR!')

      await deleteSeeker(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '2' } })
      expect(stubbedDestroySeeker).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete seeker, please try again')
    })
  })


  describe('deleteSeekerTitle', () => {
    it('Deletes a seeker title referenced by the seeker id and title id in the route from the database', async () => {
      const request = { params: { id: '2', titleId: '1' } }

      stubbedFindOneSeeker.returns(singleSeeker)
      stubbedFindOneTitle.returns(singleTitle)

      await deleteSeekerTitle(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '2' } })
      expect(stubbedFindOneTitle).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedDestroySeekerTitle).to.have.been.calledWith({ where: { seekerId: '2', titleId: '1' } })
      expect(stubbedSendStatus).to.have.been.calledWith(204)
    })


    it('returns a 404 status when no seeker is found with the id in the route', async () => {
      const request = { params: { id: '2', titleId: '1' } }

      stubbedFindOneSeeker.returns(null)

      await deleteSeekerTitle(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '2' } })
      expect(stubbedDestroySeekerTitle).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No seeker with the id of "99" found')
    })

    it('returns a 404 status when no title is found with the title id in the route', async () => {
      const request = { params: { id: '2', titleId: '1' } }

      stubbedFindOneSeeker.returns(singleSeeker)
      stubbedFindOneTitle.returns(null)

      await deleteSeekerTitle(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '2' } })
      expect(stubbedFindOneTitle).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedDestroySeekerTitle).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No seeker with the id of "99" found')
    })

    it('returns a 500 status when an error occurs deleting the seeker', async () => {
      const request = { params: { id: '2', titleId: '1' } }

      stubbedFindOneSeeker.throws('ERROR!')

      await deleteSeekerTitle(request, response)

      expect(stubbedFindOneSeeker).to.have.been.calledWith({ where: { id: '2' } })
      expect(stubbedDestroySeeker).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete seeker title, please try again')
    })
  })
})
