const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const seekerData = require('../../seekerData')
const { getDocView } = require('../../controllers/documentation')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - Documentation', () => {
  let response
  let sandbox
  let stubbedRender

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedRender = sandbox.stub()

    response = {
      render: stubbedRender,
      locals: { section: 'seekers' }
    }
  })

  beforeEach(() => {

  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getDocView', () => {
    it('retrieves the description text for the documentation page referenced by section in the route and stored in locals.section, returning response.render() with the index pug file name and an object with the description in it', async () => {
      await getDocView({}, response)

      expect(stubbedRender).to.have.been.calledWith('index', { description: seekerData.seekers.description })
    })
  })
})
