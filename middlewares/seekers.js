const { sanitize } = require('./helpers')

const checkRequiredSeekerFields = (req, res, next) => {
  try {
    const { name, age, gender, lodestar } = req.body

    if (!name || !age || !gender) {
      return res.status(400).send('The following fields are required: "name", "age", and "gender"')
    }

    if (!parseInt(age)) return res.status(400).send('Seeker age must be an integer')

    if (!['female', 'male', 'other'].includes(gender)) {
      return res.status(400).send('Allowed seeker genders are: "female", "male", and "other"')
    }

    req.body.age = parseInt(age)
    req.body.lodestar = lodestar === 'true' ? 1 : 0

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve fields, please try again')
  }
}

const parseSeekerPatchInput = (req, res, next) => {
  try {
    const property = req.params.property.toLowerCase()
    const val = sanitize(req.body)

    if (!['name', 'age', 'gender'].includes(property)) {
      return res.status(400).send(`No seeker property of "${property}"`)
    }

    if (property === 'age' && !parseInt(val)) return res.status(400).send('Seeker age must be an integer')

    if (property === 'gender' && !['female', 'male', 'other'].includes(val)) {
      return res.status(400).send('Allowed seeker genders are: "female", "male", and "other"')
    }

    req.params.property = property

    next()
  } catch (error) {
    return res.status(500).send('Unable to parse seeker patch input, please try again')
  }
}

module.exports = {
  checkRequiredSeekerFields, parseSeekerPatchInput
}
