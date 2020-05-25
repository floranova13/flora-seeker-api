/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { setLocals } = require('../../middlewares/documentation')

chai.use(sinonChai)

const { expect } = chai

describe('Middlewares - Documentation', () => {
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

  describe('setLocals', () => {
    it('takes a section parameter from the route and sets locals to the documentation data in the documentation file, only setting locals.familyVal if the section is "collection", calling next when done', async () => {
      const request = { params: { section: 'map', family: '' }, locals: {} }

      await setLocals(request, response)

      expect(stubbedNext).to.have.callCount(1)
      expect(request.locals).to.have.property('pathDir')
      expect(request.locals).to.have.property('section')
      expect(request.locals).to.have.property('sectionVal')
      expect(request.locals).to.have.property('family')
      expect(request.locals).to.have.property('familyVal')
    })

    it('if the section parameter in the route is "family", sets familyVal local to the data in the documentation file', async () => {
      const request = { params: { section: 'collection', family: 'falshrooms' } }

      await setLocals(request, response)

      expect(stubbedNext).to.have.callCount(1)
      expect(request.locals).to.have.property('pathDir')
      expect(request.locals).to.have.property('section')
      expect(request.locals).to.have.property('sectionVal')
      expect(request.locals).to.have.property('family')
      expect(request.locals).to.have.property('familyVal')
    })


    it('returns a 404 status when the section is not "root", "seekers", "collection", or "map", sending a message', async () => {
      const request = { params: { section: 'reach', family: 'falshrooms' } }

      await setLocals(request, response)

      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('no section "reach" found!')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 404 status when the section is "collection", but the family is not "falshrooms", "flesherfungi", "flourishflora", "maremolds", "trees", or "waveskellen", sending a message', async () => {
      const request = { params: { section: 'collection', family: 'reach' } }

      await setLocals(request, response)

      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('no collection family "reach" found')
      expect(stubbedNext).to.have.callCount(0)
    })

    it('returns a 500 status when an error occurs setting the locals', async () => {
      const request = { params: { section: 'collection', family: 'falshrooms' } }

      stubbedNext.throws('ERROR')

      await setLocals(request, response)

      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedSend).to.have.been.calledWith('Unable to set documentation locals, please try again')
      expect(stubbedNext).to.have.callCount(1)
    })
  })
})
