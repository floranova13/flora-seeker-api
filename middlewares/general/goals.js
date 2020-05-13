const models = require('../../models')
const { getGoalByCode } = require('../../controllers/general/goals')

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

const checkGoalsRoute = (req, res, next) => {
  try {
    if (req.params.code) return getGoalByCode(req, res)
    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve param, please try again')
  }
}

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
    return res.status(500).send('Unable to retrieve fields, please try again')
  }
}

const parseGoalCode = (req, res, next) => {
  try {
    req.params.code = req.params.code.toUpperCase()

    next()
  } catch (error) {
    return res.status(500).send('Unable to parse goal code, please try again')
  }
}

module.exports = {
  checkGoalExists, checkGoalsRoute, checkRequiredGoalFields, checkGoalCodeUnique, parseGoalCode
}
