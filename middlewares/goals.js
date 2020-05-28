const models = require('../models')

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
    const code = req.body.code.toUpperCase()

    const goal = await models.Goals.findOne({ where: { code } })

    if (goal) return res.status(400).send(`The goal code "${code}" already exists`)

    req.body.code = code

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve goal, please try again')
  }
}

const parseGoalCode = (req, res, next) => { // SANITIZE?
  try {
    const { code } = req.body

    if (!code || code.length !== 4) return res.status(400).send('Invalid goal code')

    req.body.code = code.toUpperCase()

    next()
  } catch (error) {
    return res.status(500).send('Unable to parse goal code, please try again')
  }
}

module.exports = {
  checkRequiredGoalFields, checkGoalCodeUnique, parseGoalCode
}
