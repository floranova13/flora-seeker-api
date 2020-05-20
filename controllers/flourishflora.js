const models = require('../models')

const getAllFlourishflora = async (req, res) => {
  try {
    const flourishflora = await models.Flourishflora.findAll()

    return res.send(flourishflora)
  } catch (error) {
    return res.status(500).send('Unable to retrieve Flourishflora list, please try again')
  }
}

const getFlourishfloraBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const Flourishflora = await models.Flourishflora.findOne({ where: { '$sample.slug$': slug } })

    return Flourishflora
      ? res.send(Flourishflora)
      : res.status(404).send(`no Flourishflora with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve Flourishflora, please try again')
  }
}

const saveNewFlourishfloraSample = async (req, res) => {
  try {
    const {
      name, description, rarity, slug, producerCoefficient
    } = req.body

    const sample = await models.Samples.create({ name, description, rarity, slug })

    await models.Flourishflora.create({ sampleId: sample.id, producerCoefficient })

    return res.status(201).send({ sample: { name, description, rarity, slug }, producerCoefficient })
  } catch (error) {
    return res.status(500).send('Unable to save flourishflora, please try again')
  }
}

const patchFlourishflora = async (req, res) => {
  try {
    const { property, val } = req.locals
    const { slug } = req.params

    const sample = await models.Samples.findOne({ where: { slug } })

    if (property === 'description' || property === 'rarity') {
      await sample.update({ [property]: val })
    }
    else {
      await models.Flourishflora.update({ [property]: val }, { where: { id: sample.id } })
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch flourishflora, please try again')
  }
}

const deleteFlourishflora = async (req, res) => {
  try {
    const { slug } = req.params

    const sample = await models.Samples({ where: { slug } })

    await models.Flourishflora.destroy({ where: { sampleId: sample.id } })
    await sample.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete flourishflora, please try again')
  }
}

module.exports = {
  getAllFlourishflora, getFlourishfloraBySlug, saveNewFlourishfloraSample, patchFlourishflora, deleteFlourishflora
}
