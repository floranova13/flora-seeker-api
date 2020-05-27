/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { sampleList, singleSample, postedSample, patchedSample } = require('../mocks/samples')
const {
  getAllSamples, getSampleByCode, saveNewSample, replaceSample, patchSampleCode, deleteSample
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
      stubbedFindAll.returns(sampleList)

      await getAllSamples({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(sampleList)
    })

    it('returns a 500 status when an error occurs retrieving the samples', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllSamples({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve sample list, please try again')
    })
  })

  describe('getSampleByCode', () => {
    it('retrieves the sample associated with the provided code from the database and calls response.send() with it', async () => {
      const request = { params: { code: 'A100' } }

      stubbedFindOne.returns(singleSample)

      await getSampleByCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedSend).to.have.been.calledWith(singleSample)
    })

    it('returns a 404 status when no sample is found', async () => {
      const request = { params: { code: 'Z999' } }

      stubbedFindOne.returns(null)

      await getSampleByCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No sample found with a code of "Z999"')
    })

    it('returns a 500 status when an error occurs retrieving the sample by code', async () => {
      const request = { params: { code: 'A100' } }

      stubbedFindOne.throws('ERROR!')

      await getSampleByCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve sample, please try again')
    })
  })

  describe('saveNewSample', () => {
    it('accepts new sample details and saves them as a new sample in the database, returning the saved record with a 201 status', async () => {
      const request = { body: postedSample }

      stubbedCreate.returns(postedSample)

      await saveNewSample(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedSample)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedSample)
    })

    it('returns a 500 status when an error occurs saving the new sample', async () => {
      const request = { body: postedSample }

      stubbedCreate.throws('ERROR!')

      await saveNewSample(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedSample)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save sample, please try again')
    })
  })

  describe('replaceSample', () => {
    it('accepts new sample details and replaces the sample referenced by code in the route with the new one in the database, returning the new sample', async () => {
      const request = { params: { code: 'A100' }, body: postedSample }

      stubbedFindOne.returns(singleSample)
      stubbedUpdate.returns(postedSample)

      await replaceSample(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedUpdate).to.have.been.calledWith(postedSample)
      expect(stubbedSend).to.have.been.calledWith(singleSample)
    })

    it('returns a 404 status when no sample is found with the code in the route', async () => {
      const request = { params: { code: 'Z999' }, body: postedSample }

      stubbedFindOne.returns(null)

      await replaceSample(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No sample found with a code of "Z999"')
    })

    it('returns a 500 status when an error occurs replacing the referenced sample', async () => {
      const request = { params: { code: 'Z999' }, body: singleSample }

      stubbedFindOne.throws('ERROR!')

      await replaceSample(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to replace sample, please try again')
    })
  })

  describe('patchSampleCode', () => {
    it('accepts a new sample code and assigns it to the sample referenced by code in the route, returning the patched sample', async () => {
      const request = { params: { code: 'E999' }, body: { code: 'D999' } }

      stubbedFindOne.returns(singleSample)
      stubbedUpdate.returns(patchedSample)

      await patchSampleCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'E999' } })
      expect(stubbedUpdate).to.have.been.calledWith({ code: 'D999' }, { where: { code: 'E999' } })
      expect(stubbedSend).to.have.been.calledWith(singleSample)
    })

    it('returns a 404 status when no sample is found with the code in the route', async () => {
      const request = { params: { code: 'E999' }, body: { code: 'D999' } }

      stubbedFindOne.returns(null)

      await patchSampleCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'E999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No sample found with a code of "E999"')
    })

    it('returns a 500 status when an error occurs patching the sample', async () => {
      const request = { params: { code: 'E999' }, body: { code: 'D999' } }

      stubbedFindOne.throws('ERROR!')

      await patchSampleCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'E999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch sample code, please try again')
    })
  })

  describe('deleteSample', () => {
    it('Deletes a sample referenced by code in the route from the database', async () => {
      const request = { params: { code: 'A100' } }

      stubbedFindOne.returns(singleSample)

      await deleteSample(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedDestroy).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedSendStatus).to.have.been.calledWith(204)
    })


    it('returns a 404 status when no sample is found with the code in the route', async () => {
      const request = { params: { code: 'Z999' } }

      stubbedFindOne.returns(null)

      await deleteSample(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No sample found with a code of "Z999"')
    })

    it('returns a 500 status when an error occurs deleting the sample', async () => {
      const request = { params: { code: 'Z999' } }

      stubbedFindOne.throws('ERROR!')

      await deleteSample(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete sample, please try again')
    })
  })
})
