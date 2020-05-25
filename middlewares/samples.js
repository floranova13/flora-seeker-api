const models = require('../models')
const { getAllSamples } = require('../controllers/samples')
const { sanitize, makeSlug } = require('./helpers')
const { propertyValid, familyProperty } = require('./helpers/samples')

const checkSampleRoute = (req, res, next) => {
  try {
    const { family, slug } = req.params

    if (!models.families.includes(family) && slug) {
      return res.status(400).send('Invalid family')
    }
    if (!slug) return getAllSamples(req, res)

    next()
  } catch (error) {
    return res.status(500).send('Unable to check sample route, please try again')
  }
}

const checkSampleStatus = async (req, res, next) => {
  try {
    const { family, slug } = req.params
    const sample = await models.Samples.findOne({ where: { slug, family } })

    if (!sample) return res.status(400).send(`The ${family} collection does not have a sample with a slug of ${slug}`)
    if (sample.rarity == 'unique') return res.status(400).send('Cannot patch or delete a "unique" sample')

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve sample, please try again')
  }
}

const validateSaveInput = async (req, res, next) => {
  try {
    const { family } = req.params
    const { name, description, rarity } = req.body

    if (!propertyValid(description) || !propertyValid(rarity) || !propertyValid(req.body[familyProperty[family]])) {
      return res.status(400).send('Invalid "description", "rarity", and/or family-specific property')
    }

    const sample = await models.Samples.findOne({ where: { name } })

    if (sample) return res.status(400).send(`Sample name "${name}" already exists`)

    req.body.slug = makeSlug(name.split(' '))

    next()
  } catch (error) {
    return res.status(500).send('Unable to validate sample save input, please try again')
  }
}

const validatePatchInput = async (req, res, next) => {
  try {
    const { family, property } = req.params
    const val = sanitize(req.body)

    if (!['description', 'rarity', familyProperty[family]].includes(property)) {
      return res.status(400).send('Invalid sample property')
    }
    if (!propertyValid(val)) {
      return res.status(400).send('Invalid property value')
    }
    if (['viraburstAbsorption', 'threat', 'producerCoefficient', 'mutationRate', 'height'].includes(property)) {
      req.body = Number(val)
    }

    next()
  } catch (error) {
    return res.status(500).send('Unable to validate sample patch property and/or value, please try again')
  }
}

module.exports = { checkSampleRoute, checkSampleStatus, validateSaveInput, validatePatchInput }
