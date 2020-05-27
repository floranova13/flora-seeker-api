/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { singleSeeker } = require('../mocks/seekers')
const {
  checkRequiredSeekerFields, parseSeekerPatchInput
} = require('../../middlewares/seekers')

chai.use(sinonChai)

const { expect } = chai

describe('Middlewares - Seekers', () => {
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

  describe('checkRequiredSeekerFields', () => {
    it('Checks the object parsed from the body for the required "name", "age", and "gender" fields, making sure they are all there. Also checks that age is an integer and that gender is "female", "male", or "other".', async () => {
      const request = { body: singleSeeker }

      await checkRequiredSeekerFields(request, response, stubbedNext)

      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status when at least one field is missing', async () => {
      const request = { body: { code: 'A111' } }

      await checkRequiredSeekerFields(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('The following fields are required: "name", "age", and "gender"')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status when age isn\'t an integer', async () => {
      const request = { body: { name: 'Argos', age: 'A', gender: 'female' } }

      await checkRequiredSeekerFields(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Seeker age must be an integer')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status when gender isn\'t "female", "male", or "other"', async () => {
      const request = { body: { name: 'Argos', age: '9999', gender: 'A' } }

      await checkRequiredSeekerFields(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Allowed seeker genders are: "female", "male", and "other"')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs retrieving the fields', async () => {
      const request = { body: singleSeeker }

      stubbedNext.throws('ERROR')

      await checkRequiredSeekerFields(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve fields, please try again')
    })
  })

  describe('parseSeekerPatchInput', () => {
    it('checks seeker patch input and the property referenced in the route to make sure the property is "name", "age", or "gender". If the property is age, it must be an integer. If the property is gender, then the value must be "female", "male", or "other."', async () => {
      const request = { params: { property: 'age' }, body: '1' }

      await parseSeekerPatchInput(request, response, stubbedNext)
      expect(stubbedNext).to.have.callCount(1)
    })

    it('checks seeker patch input and the property referenced in the route to make sure the property is "name", "age", or "gender". If the property is gender, then the value must be "female", "male", or "other."', async () => {
      const request = { params: { property: 'gender' }, body: 'male' }

      await parseSeekerPatchInput(request, response, stubbedNext)
      expect(stubbedNext).to.have.callCount(1)
    })

    it('checks seeker patch input and the property referenced in the route to make sure the property is "name", "age", or "gender".', async () => {
      const request = { params: { property: 'name' }, body: 'Mia' }

      await parseSeekerPatchInput(request, response, stubbedNext)
      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status when the property isn\'t "name", "age", or "gender"', async () => {
      const request = { params: { property: 'vira' }, body: '1' }

      await parseSeekerPatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No seeker property of "vira"')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status when the property is age and the value isn\'t an integer', async () => {
      const request = { params: { property: 'age' }, body: 'A' }

      await parseSeekerPatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Seeker age must be an integer')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status when the property is gender and the value isn\'t "female", "male", or "other"', async () => {
      const request = { params: { property: 'gender' }, body: '1' }

      await parseSeekerPatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Allowed seeker genders are: "female", "male", and "other"')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs retrieving the fields', async () => {
      const request = { params: { property: 'gender' }, body: 'other' }

      stubbedNext.throws('ERROR')

      await parseSeekerPatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to parse seeker patch input, please try again')
    })
  })
})
