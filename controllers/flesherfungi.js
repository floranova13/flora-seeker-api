const models = require('../models')

const getAllFlesherfungi = async (req, res) => {
  try {
    const flesherfungi = await models.Flesherfungi.findAll()

    return res.send(flesherfungi)
  } catch (error) {
    return res.status(500).send('Unable to retrieve flesherfungus list, please try again')
  }
}

const getFlesherfungusBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const flesherfungus = await models.Flesherfungi.findOne({ where: { '$sample.slug$': slug } })

    return flesherfungus
      ? res.send(flesherfungus)
      : res.status(404).send(`no flesherfungus with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve flesherfungus, please try again')
  }
}

const saveNewFlesherfungusSample = async (req, res) => {
  try {
    const {
      name, description, rarity, slug, threat
    } = req.body

    const sample = await models.Samples.create({ name, description, rarity, slug })

    await models.Flesherfungi.create({ sampleId: sample.id, threat })

    return res.status(201).send({ sample: { name, description, rarity, slug }, threat })
  } catch (error) {
    return res.status(500).send('Unable to save flesherfungus, please try again')
  }
}

const patchFlesherfungus = async (req, res) => {
  try {
    const { property, val } = req.locals
    const { slug } = req.params

    const sample = await models.Samples.findOne({ where: { slug } })

    if (property === 'description' || property === 'rarity') {
      await sample.update({ [property]: val })
    }
    else {
      await models.Flesherfungi.update({ [property]: val }, { where: { id: sample.id } })
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch flesherfungus, please try again')
  }
}

const deleteFlesherfungus = async (req, res) => {
  try {
    const { slug } = req.params

    const sample = await models.Samples({ where: { slug } })

    await models.Flesherfungi.destroy({ where: { sampleId: sample.id } })
    await sample.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete flesherfungus, please try again')
  }
}

module.exports = {
  getAllFlesherfungi, getFlesherfungusBySlug, saveNewFlesherfungusSample, patchFlesherfungus, deleteFlesherfungus
}
