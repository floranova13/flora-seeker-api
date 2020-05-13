/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
// const { x } = require('../mocks/general/guidelines')
// const { x } = require('../../../controllers/general/guidelines')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - Guidelines', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Guidelines, 'findAll')
    stubbedFindOne = sandbox.stub(models.Villains, 'findOne')
    stubbedCreate = sandbox.stub(models.Villains, 'create')

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


  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(guidelinesList)

      await getAllGuidelines({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(guidelinesList)
    })

    it('returns a 500 status when an error occurs retrieving the villains', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllGuidelines({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve villain list, please try again')
    })
  })

  describe('getVillainBySlug', () => {
    it('retrieves the villain associated with the provided slug from the database and calls response.send() with it', async () => {
      const request = { params: { slug: 'captain-hook' } }

      stubbedFindOne.returns(singleVillain)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'], where: { slug: 'captain-hook' }
      })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })

    it('returns a 404 status when no villain is found', async () => {
      const request = { params: { slug: 'doctor-horrible' } }

      stubbedFindOne.returns(null)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'], where: { slug: 'doctor-horrible' }
      })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('no villain with the slug of \'doctor-horrible\' found')
    })

    it('returns a 500 status when an error occurs retrieving the villain by id', async () => {
      const request = { params: { slug: 'doctor-horrible' } }

      stubbedFindOne.throws('ERROR!')

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        attributes: ['name', 'movie', 'slug'], where: { slug: 'doctor-horrible' }
      })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve villain, please try again')
    })
  })

  describe('saveNewVillain', () => {
    it('accepts new villain details and saves them as a new villain in the database, returning the saved record with a 201 status', async () => {
      const request = { body: postedVillain }

      stubbedCreate.returns(singleVillain)

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleVillain)
    })

    it('returns a 500 status when an error occurs saving the new villain', async () => {
      const request = { body: postedVillain }

      stubbedCreate.throws('ERROR!')

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedVillain)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save villain, please try again')
    })
  })
})
