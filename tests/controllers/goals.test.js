/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { goalList, singleGoal, postedGoal, patchedGoal } = require('../mocks/goals')
const {
  getAllGoals, getGoalByCode, saveNewGoal, replaceGoal, patchGoalCode, deleteGoal
} = require('../../controllers/goals')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - Goals', () => {
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

    stubbedFindAll = sandbox.stub(models.Goals, 'findAll')
    stubbedFindOne = sandbox.stub(models.Goals, 'findOne')
    stubbedCreate = sandbox.stub(models.Goals, 'create')
    stubbedUpdate = sandbox.stub(models.Goals, 'update')
    stubbedDestroy = sandbox.stub(models.Goals, 'destroy')

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

  describe('getAllGoals', () => {
    it('retrieves a list of goals from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(goalList)

      await getAllGoals({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(goalList)
    })

    it('returns a 500 status when an error occurs retrieving the goals', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllGoals({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve goal list, please try again')
    })
  })

  describe('getGoalByCode', () => {
    it('retrieves the goal associated with the provided code from the database and calls response.send() with it', async () => {
      const code = 'A100'
      const request = { params: { code } }

      stubbedFindOne.returns(singleGoal)

      await getGoalByCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code } })
      expect(stubbedSend).to.have.been.calledWith(singleGoal)
    })

    it('returns a 404 status when no goal is found', async () => {
      const code = 'Z999'
      const request = { params: { code } }

      stubbedFindOne.returns(null)

      await getGoalByCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith(`No goal found with a code of "${code}"`)
    })

    it('returns a 500 status when an error occurs retrieving the goal by code', async () => {
      const request = { params: { code: 'A100' } }

      stubbedFindOne.throws('ERROR!')

      await getGoalByCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve goal, please try again')
    })
  })

  describe('saveNewGoal', () => {
    it('accepts new goal details and saves them as a new goal in the database, returning the saved record with a 201 status', async () => {
      const request = { body: postedGoal }

      stubbedCreate.returns(postedGoal)

      await saveNewGoal(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedGoal)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedGoal)
    })

    it('returns a 500 status when an error occurs saving the new goal', async () => {
      const request = { body: postedGoal }

      stubbedCreate.throws('ERROR!')

      await saveNewGoal(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedGoal)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save goal, please try again')
    })
  })

  describe('replaceGoal', () => {
    it('accepts new goal details and replaces the goal referenced by code in the route with the new one in the database, returning the new goal', async () => {
      const request = { params: { code: 'A100' }, body: postedGoal }

      stubbedFindOne.returns(singleGoal)
      stubbedUpdate.returns(postedGoal)

      await replaceGoal(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedUpdate).to.have.been.calledWith(postedGoal)
      expect(stubbedSend).to.have.been.calledWith(postedGoal)
    })

    it('returns a 404 status when no goal is found with the code in the route', async () => {
      const request = { params: { code: 'Z999' }, body: postedGoal }

      stubbedFindOne.returns(null)

      await replaceGoal(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No goal found with a code of "Z999"')
    })

    it('returns a 500 status when an error occurs replacing the referenced goal', async () => {
      const request = { params: { code: 'Z999' }, body: singleGoal }

      stubbedFindOne.throws('ERROR!')

      await replaceGoal(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to replace goal, please try again')
    })
  })

  describe('patchGoalCode', () => {
    it('accepts a new goal code and assigns it to the goal referenced by code in the route, returning the patched goal', async () => {
      const request = { params: { code: 'E999' }, body: { code: 'D999' } }

      stubbedFindOne.returns(singleGoal)
      stubbedUpdate.returns(patchedGoal)

      await patchGoalCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'E999' } })
      expect(stubbedUpdate).to.have.been.calledWith({ code: 'D999' })
      expect(stubbedSend).to.have.been.calledWith(patchedGoal)
    })

    it('returns a 404 status when no goal is found with the code in the route', async () => {
      const request = { params: { code: 'E999' }, body: { code: 'D999' } }

      stubbedFindOne.returns(null)

      await patchGoalCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'E999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No goal found with a code of "E999"')
    })

    it('returns a 500 status when an error occurs patching the goal', async () => {
      const request = { params: { code: 'E999' }, body: { code: 'D999' } }

      stubbedFindOne.throws('ERROR!')

      await patchGoalCode(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'E999' } })
      expect(stubbedUpdate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch goal code, please try again')
    })
  })

  describe('deleteGoal', () => {
    it('Deletes a goal referenced by code in the route from the database', async () => {
      const request = { params: { code: 'A100' } }

      stubbedFindOne.returns(singleGoal)

      await deleteGoal(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedDestroy).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(204)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleGoal)
    })


    it('returns a 404 status when no goal is found with the code in the route', async () => {
      const request = { params: { code: 'Z999' } }

      stubbedFindOne.returns(null)

      await deleteGoal(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'A100' } })
      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No goal found with a code of "Z999"')
    })

    it('returns a 500 status when an error occurs deleting the goal', async () => {
      const request = { params: { code: 'Z999' } }

      stubbedFindOne.throws('ERROR!')

      await deleteGoal(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { code: 'Z999' } })
      expect(stubbedDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete goal, please try again')
    })
  })
})
