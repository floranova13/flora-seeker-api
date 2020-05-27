/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { singleSample } = require('../mocks/samples')
const { checkRequiredSampleFields, checkSampleCodeUnique, parseSampleCode } = require('../../middlewares/samples')

chai.use(sinonChai)

const { expect } = chai

describe('Middlewares - Samples', () => {
  let response
  let sandbox
  let stubbedFindOne
  let stubbedSend
  let stubbedStatus
  let stubbedStatusDotSend
  let stubbedNext

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.Samples, 'findOne')

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

  describe('checkRequiredSampleFields', () => {
    it('Checks the object parsed from the body for the required "name", "description", and "code" fields, making sure they are all there', async () => {
      const request = { body: singleSample }

      await checkRequiredSampleFields(request, response, stubbedNext)

      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status when at least one field is missing', async () => {
      const request = { body: { code: 'A111' } }

      await checkRequiredSampleFields(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('The following fields are required: name, description, code')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs retrieving the fields', async () => {
      const request = { body: singleSample }

      stubbedNext.throws('ERROR')

      await checkRequiredSampleFields(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve fields, please try again')
    })
  })

  describe('checkSampleCodeUnique', () => {
    it('checks a sample code in the body to see if it is unique', async () => {
      const request = { body: { code: 'A100' } }

      stubbedFindOne.returns(null)

      await checkSampleCodeUnique(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status when the sample code in the body already exists', async () => {
      const request = { body: { code: 'A100' } }

      stubbedFindOne.returns(singleSample)

      await checkSampleCodeUnique(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('The sample code "A100" already exists')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs retrieving the sample by code', async () => {
      const request = { body: { code: 'A100' } }

      stubbedFindOne.throws('ERROR!')

      await checkSampleCodeUnique(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve sample, please try again')
      expect(stubbedNext).to.have.callCount(0)
    })
  })

  describe('parseSampleCode', () => {
    it('checks a sample code in a code property of the body to make sure it exists and is of length 4, calling next()', async () => {
      const request = { body: { code: 'Z999' } }

      await parseSampleCode(request, response, stubbedNext)

      expect(stubbedNext).to.have.callCount(1)
    })

    it('if there is no "code" property in the body, checks that the body is a string of length 4 and calls next()', async () => {
      const request = { body: 'Z999' }

      await parseSampleCode(request, response, stubbedNext)

      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status when the body contains an invalid sample code', async () => {
      const request = { body: { code: 'Z9999' } }

      await parseSampleCode(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Invalid sample code')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when parsing the sample code', async () => {
      const request = { body: 'Z999' }

      stubbedNext.throws('ERROR!')

      await parseSampleCode(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to parse sample code, please try again')
      expect(stubbedNext).to.have.callCount(1)
    })
  })
})
