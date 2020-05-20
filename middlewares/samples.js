const models = require('../models')
const { getAllFalshrooms } = require('../controllers/falshrooms')
const { getAllFlesherfungi } = require('../controllers/flesherfungi')
const { getAllFlourishflora } = require('../controllers/flourishflora')
const { getAllMaremolds } = require('../controllers/maremolds')
const { getAllTrees } = require('../controllers/trees')
const { getAllWaveskellen } = require('../controllers/waveskellen')
const { makeSlug } = require('./helpers')

const familyGetAllControllers = {
  falshrooms: getAllFalshrooms,
  flesherfungi: getAllFlesherfungi,
  flourishflora: getAllFlourishflora,
  maremolds: getAllMaremolds,
  trees: getAllTrees,
  waveskellen: getAllWaveskellen
}

const checkSampleRoute = (req, res, next) => {
  try {
    const { family, slug } = req.params

    if (!models.families.includes(family)) {
      return res.status(400).send('invalid family')
    }
    if (!slug) return familyGetAllControllers[family](req, res)

    req.locals.familyModel = models[(family.charAt(0).toUpperCase() + family.slice(1))]

    next()
  } catch (error) {
    return res.status(500).send('Unable to check sample route, please try again')
  }
}

const checkNotUnique = async (req, res, next) => {
  try {
    const { slug } = req.params
    const { familyModel } = req.locals

    const family = await familyModel.findOne({ where: { slug } })
    const sample = await models.Samples.findOne({ where: { id: family.sampleId } })

    if (sample.rarity == 'unique') return res.status(400).send('Cannot patch or delete a "unique" sample')

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve sample, please try again')
  }
}

const propertyValid = {
  description: () => true,
  rarity: val => ['common', 'uncommon', 'rare', 'legendary', 'unique'].includes(val),
  viraburstAbsorption: val => Number.isInteger(val),
  threat: val => Number.isInteger(val),
  producerCoefficient: val => !isNaN(val),
  mutationRate: val => Number.isInteger(val),
  height: val => !isNaN(val),
  cascade: val => ['clarion', 'umbra', 'nihil', 'anomalous'].includes(val)
}

const familyProperty = {
  falshrooms: 'viraburstAbsorption',
  flesherfungi: 'threat',
  flourishflora: 'producerCoefficient',
  maremolds: 'mutationRate',
  trees: 'height',
  waveskellen: 'cascade'
}

const validateSaveInput = async (req, res, next) => {
  try {
    const { family } = req.params
    const { name, description, rarity } = req.body

    if (!propertyValid(description) || !propertyValid(rarity) || !propertyValid(req.body[familyProperty[family]])) {
      return res.status(400).send('Invalid "description", "rarity", and/or variant-specific property')
    }

    const sample = await models.Samples.findOne({ where: { name } })

    if (sample) return res.status(400).send(`Name "${name}" already exists`)

    req.body.slug = makeSlug(name)

    next()
  } catch (error) {
    return res.status(500).send('Unable to validate sample save input, please try again')
  }
}

const validatePatchInput = async (req, res, next) => {
  try {
    const { property } = req.params
    let val = req.body
    const properties = [
      'name',
      'description',
      'rarity',
      'slug',
      'viraburstAbsorption',
      'threat',
      'producerCoefficient',
      'mutationRate',
      'height',
      'cascade'
    ] // sanitize val

    if (!properties.includes(property)) {
      return res.status(400).send(`No sample with the property "${property}" exists`)
    }
    if (!propertyValid(val)) {
      return res.status(400).send(`Invalid property value for "${property}"`)
    }
    if (['viraburstAbsorption', 'threat', 'producerCoefficient', 'mutationRate', 'height'].includes(property)) {
      req.body = Number(val)
    }

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve sample by slug, please try again')
  }
}

module.exports = { checkSampleRoute, checkNotUnique, validateSaveInput, validatePatchInput }
