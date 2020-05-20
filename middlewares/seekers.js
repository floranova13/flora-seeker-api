const models = require('../models')
const { getAllSeekersWithTitles } = require('../controllers/seekers')
// const

const checkSeekersRoute = (req, res, next) => {
  try {
    if (!req.params.id) return getAllSeekersWithTitles(req, res)
    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve param, please try again')
  }
}

const checkSeekerExists = async (req, res, next) => {
  try {
    const { id } = req.params

    const seeker = await models.Seekers.findOne({ where: { id } })

    if (!seeker) return res.status(404).send(`No seeker with the id of '${id}' found`)

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker by id, please try again')
  }
}

const checkRequiredSeekerFields = (req, res, next) => {
  try {
    const { name, age, gender, lodestar } = req.body

    if (!name || !age || !gender) {
      return res.status(400).send('The following fields are required: "name", "age", "gender"')
    }

    if (!parseInt(age)) res.status(400).send('Seeker age must be a number')

    if (!['female', 'male', 'other'].includes(gender)) {
      return res.status(400).send('Allowed seeker genders are: "female", "male", and "other"')
    }

    req.locals.name = name
    req.locals.age = parseInt(age)
    req.locals.gender = gender
    req.locals.lodestar = lodestar === 'true' ? 1 : 0

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve fields, please try again')
  }
}

/*
const isValidInput = async (property, val) {
  try {
    const property = req.params.property.toLowerCase()

    if (!['name', 'age', 'gender'].includes(req.params.property)) {
      return res.status(404).send(`No seeker with the id of '${id}' found`)
    }

    if()

    req.params.property = property

    next()
  } catch (error) {
    return res.status(500).send('Unable to check validity of seeker data, please try again')
  }
}
*/

const parsePatchInput = async (req, res, next) => { // NOT DONE!
  try {
    const property = req.params.property.toLowerCase()

    if (!['name', 'age', 'gender'].includes(property)) {
      return res.status(404).send(`No seeker property of '${property}' found`)
    }

    req.params.property = property

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker by id, please try again')
  }
}

module.exports = {
  checkSeekersRoute, checkSeekerExists, checkRequiredSeekerFields, parsePatchInput
}
