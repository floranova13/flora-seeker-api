const models = require('../models')

const getAllTrees = async (req, res) => {
  try {
    const trees = await models.Trees.findAll()

    return res.send(trees)
  } catch (error) {
    return res.status(500).send('Unable to retrieve tree list, please try again')
  }
}

const getTreeBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const tree = await models.Trees.findOne({ where: { '$sample.slug$': slug } })

    return tree
      ? res.send(tree)
      : res.status(404).send(`no tree with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve tree, please try again')
  }
}

const saveNewTreeSample = async (req, res) => {
  try {
    const {
      name, description, rarity, slug, height
    } = req.body

    const sample = await models.Samples.create({ name, description, rarity, slug })

    await models.Trees.create({ sampleId: sample.id, height })

    return res.status(201).send({ sample: { name, description, rarity, slug }, height })
  } catch (error) {
    return res.status(500).send('Unable to save tree, please try again')
  }
}

const patchTree = async (req, res) => {
  try {
    const { property, val } = req.locals
    const { slug } = req.params

    const sample = await models.Samples.findOne({ where: { slug } })

    if (property === 'description' || property === 'rarity') {
      await sample.update({ [property]: val })
    }
    else {
      await models.Trees.update({ [property]: val }, { where: { id: sample.id } })
    }

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to patch tree, please try again')
  }
}

const deleteTree = async (req, res) => {
  try {
    const { slug } = req.params

    const sample = await models.Samples({ where: { slug } })

    await models.Trees.destroy({ where: { sampleId: sample.id } })
    await sample.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete tree, please try again')
  }
}

module.exports = {
  getAllTrees, getTreeBySlug, saveNewTreeSample, patchTree, deleteTree
}
