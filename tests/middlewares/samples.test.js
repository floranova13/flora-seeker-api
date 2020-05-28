/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { singleFlourishflora, uniqueSample, postedSample } = require('../mocks/samples')
const { checkSampleRoute, checkSampleStatus, validateSaveInput, validatePatchInput } = require('../../middlewares/samples')

chai.use(sinonChai)

const { expect } = chai

describe('Middlewares - Samples', () => {
  let response
  let sandbox
  let stubbedFindOne
  let stubbedGetAllSamples
  let stubbedSend
  let stubbedStatus
  let stubbedStatusDotSend
  let stubbedNext

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindOne = sandbox.stub(models.Samples, 'findOne')
    stubbedGetAllSamples = sandbox.stub()

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

  describe('checkSampleRoute', () => {
    it('checks for family and slug parameters, calling getAllSamples(req, res) if are no parameters passed in the route', async () => {
      const request = { params: { } }

      await checkSampleRoute(request, response, stubbedNext)

      expect(stubbedNext).to.have.callCount(0)
    })

    it('checks if there is a slug and family parameter passed in the route and, if the family parameter is "falshrooms", "flesherfungi", "flourishflora", "maremolds", "trees", or "waveskellen", it calls next()', async () => {
      const request = { params: { family: 'flourishflora', slug: 'mellowend' } }

      await checkSampleRoute(request, response, stubbedNext)

      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status with an error message if there is a slug but an invalid family parameter', async () => {
      const request = { params: { family: '', slug: 'mellowend' } }

      await checkSampleRoute(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Invalid family')
      expect(stubbedNext).to.have.callCount(0)
      expect(stubbedGetAllSamples).to.have.callCount(0)
    })

    it('returns a 500 status with an error message when an error occurs checking the route', async () => {
      const request = { params: { family: 'flourishflora', slug: 'mellowend' } }

      stubbedNext.throws('ERROR')

      await checkSampleRoute(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to check sample route, please try again')
    })
  })

  describe('checkSampleStatus', () => {
    it('finds a sample with the family and slug parameters in the route and calls next() if one is found', async () => {
      const request = { params: { family: singleFlourishflora.family, slug: singleFlourishflora.slug } }

      stubbedFindOne.returns(singleFlourishflora)

      await checkSampleStatus(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          slug: singleFlourishflora.slug,
          family: singleFlourishflora.family
        }
      })
      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status and sends an error message when a sample cannot be found', async () => {
      const request = { params: { family: '', slug: '' } }

      stubbedFindOne.returns(null)

      await checkSampleStatus(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: '', family: '' } })
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('The  collection does not have a sample with a slug of ')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status and sends an error message when a sample found has a rarity of "unique"', async () => {
      const request = { params: { family: uniqueSample.family, slug: uniqueSample.slug } }

      stubbedFindOne.returns(uniqueSample)

      await checkSampleStatus(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          slug: uniqueSample.slug,
          family: uniqueSample.family
        }
      })
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Cannot patch or delete a "unique" sample')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status and sends an error message when an error occurs checking the sample status', async () => {
      const request = { params: { family: uniqueSample.family, slug: uniqueSample.slug } }

      stubbedFindOne.throws('ERROR')

      await checkSampleStatus(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve sample, please try again')
      expect(stubbedNext).to.have.callCount(0)
    })
  })

  describe('validateSaveInput', () => {
    it('checks family parameter in the route to determine if the required values are passed in to save a new sample. , and if each property has a valid value for the property, creating a slug in the body and calling next()', async () => {
      const request = { params: { family: 'falshrooms' }, body: postedSample }

      stubbedFindOne.returns(null)

      await validateSaveInput(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          name: postedSample.name,
          family: request.params.family
        }
      })
      expect(request.body).to.haveOwnProperty('slug')
      expect(request.body.slug).to.equal('reeker-redcap')
      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status and sends an error message when the sample data in the body is incomplete', async () => {
      const request = { params: { family: 'flourishflora' }, body: { name: '' } }

      await validateSaveInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Invalid "description", "rarity", and/or family-specific property')
      expect(stubbedFindOne).to.have.callCount(0)
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status and sends an error message when the sample name in the body belongs to an existing sample', async () => {
      const request = { params: { family: 'falshrooms' }, body: postedSample }

      stubbedFindOne.returns(postedSample)

      await validateSaveInput(request, response, stubbedNext)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          name: postedSample.name,
          family: request.params.family
        }
      })
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Falshrooms sample "Reeker Redcap" already exists')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs validating the save data', async () => {
      const request = { params: { family: 'falshrooms' }, body: postedSample }

      stubbedFindOne.throws('ERROR!')

      await validateSaveInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to validate sample save input, please try again')
      expect(stubbedNext).to.have.callCount(0)
    })
  })

  describe('validatePatchInput', () => {
    it('checks family and slug parameters in the route to determine if the family is "falshrooms", "flesherfungi", "flourishflora", "maremolds", "trees", or "waveskellen" and if the property is "description", "rarity", or belongs to the family values category, which is, depending on the family, "viraburstAbsorption", "threat", "producerCoefficient", "mutationRate", "height", or "cascade". Finally, confirms that the, after sanitizing the body, it is a valid value for the property and calls next()', async () => {
      const request = { params: { family: 'flourishflora', property: 'rarity' }, body: 'common' }

      await validatePatchInput(request, response, stubbedNext)

      expect(request).to.haveOwnProperty('locals')
      expect(request.locals).to.haveOwnProperty('property')
      expect(request.locals).to.haveOwnProperty('val')
      expect(request.locals.property).to.equal('rarity')
      expect(request.locals.val).to.equal('common')
      expect(stubbedNext).to.have.callCount(1)
    })

    it('converts a family-specific property to the proper JSON format when storing "property" and "val" in locals', async () => {
      const request = { params: { family: 'trees', property: 'height' }, body: '1' }

      await validatePatchInput(request, response, stubbedNext)

      expect(request).to.haveOwnProperty('locals')
      expect(request.locals).to.haveOwnProperty('property')
      expect(request.locals).to.haveOwnProperty('val')
      expect(request.locals.property).to.equal('familyValues')
      expect(request.locals.val).to.equal('{ "height": "1" }')
      expect(stubbedNext).to.have.callCount(1)
    })

    it('returns a 400 status with an error message when there is no property parameter in the route', async () => {
      const request = { params: { family: 'flourishflora', property: 'INVALID' }, body: '' }

      await validatePatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Invalid sample property')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status with an error message when there is no property parameter in the route', async () => {
      const request = { params: { family: 'flourishflora' }, body: '' }

      await validatePatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Invalid sample property')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status with an error message when the body contains an invalid value', async () => {
      const request = { params: { family: 'trees', property: 'height' }, body: 'AAA' }

      await validatePatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Invalid sample value')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 400 status with an error message when there is nothing in the body', async () => {
      const request = { params: { family: 'trees', property: 'height' }, body: '' }

      await validatePatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Invalid sample value')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status with an error message when an error occurs validating the sample patch data', async () => {
      const request = { params: { family: 'flourishflora', property: 'rarity' }, body: 'common' }

      stubbedNext.throws('ERROR!')

      await validatePatchInput(request, response, stubbedNext)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to validate sample patch property and/or value, please try again')
    })
  })
})
