const models = require('../../models')

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
      : res.status(404).send(`no goal with the code of '${code}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve goal, please try again')
  }
}

const saveNewGoal = async (req, res) => {
  try {
    const {
      name, description
    } = req.body
    const code = req.body.code.toUpperCase()

    await models.Goals.create({
      name, description, code
    })

    return res.status(201).send({ name, description, code })
  } catch (error) {
    return res.status(500).send('Unable to save goal, please try again')
  }
}

const replaceGoal = async (req, res) => {
  try {
    const {
      name, description
    } = req.body
    const code = req.body.code.toUpperCase()

    const goal = await models.Goals.findOne({ where: { code } })

    const success = await goal.upsert({ name, description, code })

    return success
      ? res.send(goal)
      : res.status(404).send(`no goal with the code of '${code}' found`)
  } catch (error) {
    return res.status(500).send('Unable to replace goal, please try again')
  }
}

const patchGoalCode = async (req, res) => {
  try {
    const existingCode = req.body.code.toUpperCase()
    const newCode = req.params.code.toUpperCase() // THIS IS NOT AN OBJECT

    const goal = await models.Goals.findOne({ where: { existingCode } })

    const success = await goal.upsert({ code: newCode })

    return success
      ? res.send(goal)
      : res.status(404).send(`no goal with the code of '${existingCode}' found`)
  } catch (error) {
    return res.status(500).send('Unable to patch goal code, please try again')
  }
}

const deleteGoal = async (req, res) => {
  try {
    const code = req.params.code.toUpperCase()

    const goal = await models.Goals.findOne({ where: { code } })

    await goal.destroy()

    return res.statusSend(204)
  } catch (error) {
    return res.status(500).send('Unable to delete goal, please try again')
  }
}

module.exports = {
  getAllGoals, getGoalByCode, saveNewGoal, replaceGoal, patchGoalCode, deleteGoal
}
