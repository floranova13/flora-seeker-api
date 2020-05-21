const models = require('../models')

const getAllSamples = async (req, res) => {
  try {
    const falshrooms = await models.Falshrooms.findAll()
    const flesherfungi = await models.Falshrooms.findAll()
    const flourishflora = await models.Falshrooms.findAll()
    const maremolds = await models.Falshrooms.findAll()
    const trees = await models.Falshrooms.findAll()
    const waveskellen = await models.Falshrooms.findAll()

    const samples = [...falshrooms, ...flesherfungi, ...flourishflora, ...maremolds, ...trees, ...waveskellen]

    return res.send(samples)
  } catch (error) {
    return res.status(500).send('Unable to retrieve sample list, please try again')
  }
}

const getAllSamplesByFamily = async (req, res) => {
  try {
    const { familyModel } = req.locals

    const samples = await familyModel.findAll()

    return res.send(samples)
  } catch (error) {
    return res.status(500).send(`Unable to retrieve ${req.params.family} list, please try again`)
  }
}

const getSampleBySlug = async (req, res) => {
  try {
    const { familyModel } = req.locals
    const { slug } = req.params

    const sample = await familyModel.findOne({ where: { '$sample.slug$': slug } })

    return sample
      ? res.send(sample)
      : res.status(404).send(`no sample with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve sample, please try again')
  }
}

// different of each IMPLEMENT!!!!! vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const saveNewSample = async (req, res) => {
  try {
    const {
      name, description, rarity, slug, viraburstAbsorption
    } = req.body

    const sample = await models.Samples.create({ name, description, rarity, slug })

    await models.Samples.create({ sampleId: sample.id, viraburstAbsorption })

    return res.status(201).send({ sample: { name, description, rarity, slug }, viraburstAbsorption })
  } catch (error) {
    return res.status(500).send('Unable to save sample, please try again')
  }
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const patchSample = async (req, res) => {
  try {
    const { property, val, familyModel } = req.locals
    const { slug } = req.params

    const sample = await models.Samples.findOne({ where: { slug } })

    if (property === 'description' || property === 'rarity') {
      await sample.update({ [property]: val })
    }
    else {
      await familyModel.update({ [property]: val }, { where: { sampleId: sample.id } })
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch sample, please try again')
  }
}

const deleteSample = async (req, res) => {
  try {
    const { familyModel } = req.locals
    const { slug } = req.params

    const sample = await models.Samples({ where: { slug } })
    const familyInstance = await familyModel.findOne({ where: { sampleId: sample.id } })

    await familyInstance.destroy()
    await sample.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete sample, please try again')
  }
}

module.exports = {
  getAllSamples, getAllSamplesByFamily, getSampleBySlug, saveNewSample, patchSample, deleteSample
}
