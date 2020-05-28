/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { singleFalshroom, sampleList, postedSample } = require('../mocks/samples')
const {
  getAllSamples, getSampleBySlug, saveNewSample, patchSample, deleteSample
} = require('../../controllers/samples')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - Samples', () => {
  let response
  let sandbox
  let stubbedCreate
  let stubbedFindOne
  let stubbedFindAll
  let stubbedUpdate
  let stubbedDestroy
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Samples, 'findAll')
    stubbedFindOne = sandbox.stub(models.Samples, 'findOne')
    stubbedCreate = sandbox.stub(models.Samples, 'create')
    stubbedUpdate = sandbox.stub(models.Samples, 'update')
    stubbedDestroy = sandbox.stub(models.Samples, 'destroy')

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

  describe('getAllSamples', () => {
    it('retrieves a list of samples from the database and calls response.send() with the list', async () => {
      const request = { params: { } }

      stubbedFindAll.returns(sampleList)

      await getAllSamples(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({})
      expect(stubbedSend).to.have.been.calledWith(sampleList)
    })

    it('retrieves a list of samples from a designated family if the family parameter in the route is assigned and calls response.send() with the list', async () => {
      const request = { params: { family: 'flourishflora' } }

      stubbedFindAll.returns(sampleList)

      await getAllSamples(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({ where: { family: 'flourishflora' } })
      expect(stubbedSend).to.have.been.calledWith(sampleList)
    })

    it('returns a 500 status when an error occurs retrieving the samples', async () => {
      const request = { params: { family: 'flourishflora' } }

      stubbedFindAll.throws('ERROR!')

      await getAllSamples(request, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve sample list, please try again')
    })
  })

  describe('getSampleBySlug', () => {
    it('retrieves the sample associated with the provided slug and family from the database and calls response.send() with it', async () => {
      const request = { params: { slug: 'reeker-redcap', family: 'falshrooms' } }

      stubbedFindOne.returns(singleFalshroom)

      await getSampleBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'reeker-redcap', family: 'falshrooms' } })
      expect(stubbedSend).to.have.been.calledWith(singleFalshroom)
    })

    it('returns a 404 status when no sample is found', async () => {
      const request = { params: { slug: 'nothing', family: 'falshrooms' } }

      stubbedFindOne.returns(null)

      await getSampleBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'nothing', family: 'falshrooms' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No sample with the slug of "nothing" found')
    })

    it('returns a 500 status when an error occurs retrieving the sample by slug and family', async () => {
      const request = { params: { slug: 'reeker-redcap', family: 'falshrooms' } }

      stubbedFindOne.throws('ERROR!')

      await getSampleBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'reeker-redcap', family: 'falshrooms' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve sample, please try again')
    })
  })

  describe('saveNewSample', () => {
    it('accepts new sample details and saves them as a new sample in the database, returning the saved record with a 201 status', async () => {
      const request = { params: { family: 'falshrooms' }, body: { ...postedSample, slug: 'reeker-redcap' } }

      stubbedCreate.returns(postedSample)

      await saveNewSample(request, response)

      expect(stubbedCreate).to.have.been.calledWith({ ...postedSample, slug: 'reeker-redcap' })
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedSample)
    })

    it('returns a 500 status when an error occurs saving the new sample', async () => {
      const request = { params: { family: 'falshrooms' }, body: { ...postedSample, slug: 'reeker-redcap' } }

      stubbedCreate.throws('ERROR!')

      await saveNewSample(request, response)

      expect(stubbedCreate).to.have.been.calledWith({ ...postedSample, slug: 'reeker-redcap' })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save sample, please try again')
    })
  })

  describe('patchSample', () => {
    it('accepts a sample property name and a new value, assigning that value to the sample referenced by slug in the route, returning a 204 status', async () => {
      const request = { params: { slug: 'mellowend', family: 'flourishflora' }, locals: { property: 'rarity', val: 'common' } }

      await patchSample(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ rarity: 'common' }, {
        where: { slug: 'mellowend', family: 'flourishflora' }
      })
      expect(stubbedSendStatus).to.have.been.calledWith(204)
    })

    it('returns a 500 status when an error occurs patching the sample', async () => {
      const request = { params: { slug: '', family: '' }, locals: { property: 'description', val: 'must feed the tests directory... my life for the tests directory' } }

      stubbedUpdate.throws('ERROR!')

      await patchSample(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ description: 'must feed the tests directory... my life for the tests directory' }, { where: { slug: '', family: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch sample, please try again')
    })
  })

  describe('deleteSample', () => {
    it('Deletes a sample referenced by slug in the route from the database', async () => {
      const request = { params: { slug: 'mellowend', family: 'flourishflora' } }

      await deleteSample(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: 'mellowend', family: 'flourishflora' } })
      expect(stubbedSendStatus).to.have.been.calledWith(204)
    })

    it('returns a 500 status when an error occurs deleting the sample', async () => {
      const request = { params: { slug: 'mellowend', family: 'flourishflora' } }

      stubbedDestroy.throws('ERROR!')

      await deleteSample(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: 'mellowend', family: 'flourishflora' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete sample, please try again')
    })
  })
})
