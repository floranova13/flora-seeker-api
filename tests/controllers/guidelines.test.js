/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { guidelineList } = require('../mocks/guidelines')
const { getAllGuidelines } = require('../../controllers/guidelines')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - Guidelines', () => {
  let response
  let sandbox
  let stubbedFindAll
  let stubbedSend
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Guidelines, 'findAll')

    stubbedSend = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

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

  describe('getAllGuidelines', () => {
    it('retrieves a list of guidelines from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(guidelineList)

      await getAllGuidelines({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(guidelineList)
    })

    it('returns a 500 status when an error occurs retrieving the guidelines list', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllGuidelines({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve guideline list, please try again')
    })
  })
})
