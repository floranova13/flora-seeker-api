const models = require('../models')
// const { getAllGoals } = require('../controllers/goals')

/*
const checkGoalsRoute = (req, res, next) => {
  try {
    if (!req.params.code) return getAllGoals(req, res)
    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve param, please try again')
  }
}
*/

/*
const checkGoalExists = async (req, res, next) => {
  try {
    const { code } = req.params

    const goal = await models.Goals.findOne({ where: { code } })

    if (!goal) return res.status(404).send(`no goal with the code of '${code}' found`)

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve location by slug, please try again')
  }
}
*/

const checkRequiredGoalFields = (req, res, next) => {
  try {
    const { name, description, code } = req.body

    if (!name || !description || !code) {
      return res.status(400).send('The following fields are required: name, description, code')
    }

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve fields, please try again')
  }
}

const checkGoalCodeUnique = async (req, res, next) => {
  try {
    const code = req.body.code = req.body.code.toUpperCase()

    const goal = await models.Goals.findOne({ where: { code } })

    if (goal) return res.status(400).send(`The goal code '${code}' already exists`)

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve goal code, please try again')
  }
}

const parseGoalCode = (req, res, next) => { // SANITIZE?
  try {
    let code = req.body.code || req.body

    if (!code || code.length !== 4) res.status(400).send('Invalid goal code')

    req.body.code = code.toUpperCase()

    next()
  } catch (error) {
    return res.status(500).send('Unable to parse goal code, please try again')
  }
}

module.exports = {
  checkRequiredGoalFields, checkGoalCodeUnique, parseGoalCode
}
