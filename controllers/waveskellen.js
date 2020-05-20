const models = require('../models')

const getAllWaveskellen = async (req, res) => {
  try {
    const waveskellen = await models.Waveskellen.findAll()

    return res.send(waveskellen)
  } catch (error) {
    return res.status(500).send('Unable to retrieve waveskell list, please try again')
  }
}

const getWaveskellBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const waveskell = await models.Waveskellen.findOne({ where: { '$sample.slug$': slug } })

    return waveskell
      ? res.send(waveskell)
      : res.status(404).send(`no waveskell with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve waveskell, please try again')
  }
}

const saveNewWaveskellSample = async (req, res) => {
  try {
    const {
      name, description, rarity, slug, cascade
    } = req.body

    const sample = await models.Samples.create({ name, description, rarity, slug })

    await models.Waveskellen.create({ sampleId: sample.id, cascade })

    return res.status(201).send({ sample: { name, description, rarity, slug }, cascade })
  } catch (error) {
    return res.status(500).send('Unable to save waveskell, please try again')
  }
}

const patchWaveskell = async (req, res) => {
  try {
    const { property, val } = req.locals
    const { slug } = req.params

    const sample = await models.Samples.findOne({ where: { slug } })

    if (property === 'description' || property === 'rarity') {
      await sample.update({ [property]: val })
    }
    else {
      await models.Waveskellen.update({ [property]: val }, { where: { id: sample.id } })
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch waveskell, please try again')
  }
}

const deleteWaveskell = async (req, res) => {
  try {
    const { slug } = req.params

    const sample = await models.Samples({ where: { slug } })

    await models.Waveskellen.destroy({ where: { sampleId: sample.id } })
    await sample.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete waveskell, please try again')
  }
}

module.exports = {
  getAllWaveskellen, getWaveskellBySlug, saveNewWaveskellSample, patchWaveskell, deleteWaveskell
}
