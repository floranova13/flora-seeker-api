/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { parseNewLocationThreat } = require('../../middlewares/locations')

chai.use(sinonChai)

const { expect } = chai

describe('Middlewares - Locations', () => {
  let response
  let sandbox
  let stubbedSend
  let stubbedStatus
  let stubbedStatusDotSend
  let stubbedNext

  before(() => {
    sandbox = sinon.createSandbox()

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

  describe('parseNewLocationThreat', () => {
    it('Checks the body to make sure it can be parsed into an integer for the new location threat value, converting it to an absolute value', async () => {
      const request = { body: { threat: '11' } }

      await parseNewLocationThreat(request, response, stubbedNext)

      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status when the body cannot be parsed into an integer', async () => {
      const request = { body: { threat: 'A' } }

      await parseNewLocationThreat(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('A location\'s new threat value must be an integer')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs retrieving the threat value from the body', async () => {
      const request = { body: { threat: '11' } }

      stubbedNext.throws('ERROR')

      await parseNewLocationThreat(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve new location threat value, please try again')
      expect(stubbedNext).to.have.callCount(1)
    })
  })
})
