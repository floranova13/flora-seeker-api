const models = require('../models')

const getAllGoals = async (req, res) => {
  try {
    const goals = await models.Goals.findAll()

    return res.send(goals)
  } catch (error) {
    return res.status(500).send('Unable to retrieve goal list, please try again')
  }
}

const getGoalByCode = async (req, res) => {
  try {
    const { code } = req.params
    const goal = await models.Goals.findOne({ where: { code } })

    return goal
      ? res.send(goal)
      : res.status(404).send(`No goal found with a code of "${code}"`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve goal, please try again')
  }
}

const saveNewGoal = async (req, res) => {
  try {
    const {
      name, description, code
    } = req.body

    await models.Goals.create({ name, description, code })

    return res.status(201).send({ name, description, code })
  } catch (error) {
    return res.status(500).send('Unable to save goal, please try again')
  }
}

const replaceGoal = async (req, res) => {
  try {
    const existingCode = req.params.code
    const { name, description, code } = req.body
    const goal = await models.Goals.findOne({ where: { code: existingCode } })

    if (!goal) return res.status(404).send(`No goal found with a code of "${existingCode}"`)

    await models.Goals.update({ name, description, code })

    return res.send(goal)
  } catch (error) {
    return res.status(500).send('Unable to replace goal, please try again')
  }
}

const patchGoalCode = async (req, res) => {
  try {
    const { code } = req.params
    const newCode = req.body.code

    const goal = await models.Goals.findOne({ where: { code } })

    if (!goal) return res.status(404).send(`No goal found with a code of "${code}"`)

    await models.Goals.update({ code: newCode }, { where: { code } })

    return res.send(goal)
  } catch (error) {
    return res.status(500).send('Unable to patch goal code, please try again')
  }
}

const deleteGoal = async (req, res) => {
  try {
    const { code } = req.params

    const goal = await models.Goals.findOne({ where: { code } })

    if (!goal) return res.status(404).send(`No goal found with a code of "${code}"`)

    await models.Goals.destroy({ where: { code } })

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete goal, please try again')
  }
}

module.exports = {
  getAllGoals, getGoalByCode, saveNewGoal, replaceGoal, patchGoalCode, deleteGoal
}
