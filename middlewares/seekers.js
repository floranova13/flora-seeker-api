const models = require('../models')
const { getAllSeekersWithTitles } = require('../controllers/seekers')

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

module.exports = {
  checkSeekersRoute, checkSeekerExists, checkRequiredSeekerFields
}
