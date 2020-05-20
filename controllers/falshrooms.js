const models = require('../models')

const getAllFalshrooms = async (req, res) => {
  try {
    const falshrooms = await models.Falshrooms.findAll()

    return res.send(falshrooms)
  } catch (error) {
    return res.status(500).send('Unable to retrieve falshroom list, please try again')
  }
}

const getFalshroomBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const falshroom = await models.Falshrooms.findOne({ where: { '$sample.slug$': slug } })

    return falshroom
      ? res.send(falshroom)
      : res.status(404).send(`no falshroom with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve falshroom, please try again')
  }
}

const saveNewFalshroomSample = async (req, res) => {
  try {
    const {
      name, description, rarity, slug, viraburstAbsorption
    } = req.body

    const sample = await models.Samples.create({ name, description, rarity, slug })

    await models.Falshrooms.create({ sampleId: sample.id, viraburstAbsorption })

    return res.status(201).send({ sample: { name, description, rarity, slug }, viraburstAbsorption })
  } catch (error) {
    return res.status(500).send('Unable to save falshroom, please try again')
  }
}

const patchFalshroom = async (req, res) => {
  try {
    const { property, val } = req.locals
    const { slug } = req.params

    const sample = await models.Samples.findOne({ where: { slug } })

    if (property === 'description' || property === 'rarity') {
      await sample.update({ [property]: val })
    }
    else {
      await models.Falshrooms.update({ [property]: val }, { where: { id: sample.id } })
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch falshroom, please try again')
  }
}

const deleteFalshroom = async (req, res) => {
  try {
    const { slug } = req.params

    const sample = await models.Samples({ where: { slug } })

    await models.Falshrooms.destroy({ where: { sampleId: sample.id } })
    await sample.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete falshroom, please try again')
  }
}

module.exports = {
  getAllFalshrooms, getFalshroomBySlug, saveNewFalshroomSample, patchFalshroom, deleteFalshroom
}
