const models = require('../models')

const getAllMaremolds = async (req, res) => {
  try {
    const maremolds = await models.Maremolds.findAll()

    return res.send(maremolds)
  } catch (error) {
    return res.status(500).send('Unable to retrieve maremold list, please try again')
  }
}

const getMaremoldBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const maremold = await models.Maremolds.findOne({ where: { '$sample.slug$': slug } })

    return maremold
      ? res.send(maremold)
      : res.status(404).send(`no maremold with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve maremold, please try again')
  }
}

const saveNewMaremoldSample = async (req, res) => {
  try {
    const {
      name, description, rarity, slug, mutationRate
    } = req.body

    const sample = await models.Samples.create({ name, description, rarity, slug })

    await models.Maremolds.create({ sampleId: sample.id, mutationRate })

    return res.status(201).send({ sample: { name, description, rarity, slug }, mutationRate })
  } catch (error) {
    return res.status(500).send('Unable to save maremold, please try again')
  }
}

const patchMaremold = async (req, res) => {
  try {
    const { property, val } = req.locals
    const { slug } = req.params

    const sample = await models.Samples.findOne({ where: { slug } })

    if (property === 'description' || property === 'rarity') {
      await sample.update({ [property]: val })
    }
    else {
      await models.Maremolds.update({ [property]: val }, { where: { id: sample.id } })
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch maremold, please try again')
  }
}

const deleteMaremold = async (req, res) => {
  try {
    const { slug } = req.params

    const sample = await models.Samples({ where: { slug } })

    await models.Maremolds.destroy({ where: { sampleId: sample.id } })
    await sample.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete maremold, please try again')
  }
}

module.exports = {
  getAllMaremolds, getMaremoldBySlug, saveNewMaremoldSample, patchMaremold, deleteMaremold
}
