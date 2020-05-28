const models = require('../models')

const getAllSamples = async (req, res) => {
  try {
    const { family } = req.params
    const search = family ? { where: { family } } : {}

    const samples = await models.Samples.findAll(search)

    return res.send(samples)
  } catch (error) {
    return res.status(500).send('Unable to retrieve sample list, please try again')
  }
}

const getSampleBySlug = async (req, res) => {
  try {
    const { slug, family } = req.params

    const sample = await models.Samples.findOne({ where: { slug, family } })

    return sample
      ? res.send(sample)
      : res.status(404).send(`No sample with the slug of "${slug}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve sample, please try again')
  }
}

const saveNewSample = async (req, res) => {
  try {
    const { family } = req.params
    const {
      name, description, rarity, familyValues, slug
    } = req.body

    const sample = await models.Samples.create({
      name, description, rarity, family, familyValues, slug
    })

    return res.status(201).send(sample)
  } catch (error) {
    return res.status(500).send('Unable to save sample, please try again')
  }
}

const patchSample = async (req, res) => {
  try {
    const { property, val } = req.locals
    const { slug, family } = req.params

    await models.Samples.update({ [property]: val }, { where: { slug, family } })

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch sample, please try again')
  }
}

const deleteSample = async (req, res) => {
  try {
    const { slug, family } = req.params

    await models.Samples.destroy({ where: { slug, family } })

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete sample, please try again')
  }
}

module.exports = {
  getAllSamples, getSampleBySlug, saveNewSample, patchSample, deleteSample
}
