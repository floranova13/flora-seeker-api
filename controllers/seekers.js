const models = require('../models')

const getAllSeekersWithTitles = async (req, res) => {
  try {
    const seekers = await models.Seekers.findAll({ include: { model: models.Titles } })

    return res.send(seekers)
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker list, please try again')
  }
}

const getSeekersByTitleId = async (req, res) => {
  try {
    const { id } = req.params

    const title = await models.Titles.findOne({ where: { id } })

    if (!title) return res.status(404).send(`No title with the id of "${id}" found`)

    const seekers = await models.Seekers.findAll({ include: { model: models.Titles, where: { id } } })

    return seekers
      ? res.send(seekers)
      : res.status(404).send(`No seekers with the title of id "${id}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve seekers by title id, please try again')
  }
}

const getSeekerByIdWithTitles = async (req, res) => {
  try {
    const { id } = req.params

    const seeker = await models.Seekers.findOne({ include: { model: models.Titles }, where: { id } })

    return seeker
      ? res.send(seeker)
      : res.status(404).send(`No seeker with the id of "${id}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker, please try again')
  }
}

const saveNewSeeker = async (req, res) => {
  try {
    const { name, age, gender, lodestar } = req.body

    const seeker = await models.Seekers.create({ name, age, gender, lodestar })

    return res.status(201).send(seeker)
  } catch (error) {
    return res.status(500).send('Unable to save seeker, please try again')
  }
}

const assignSeekerTitle = async (req, res) => {
  try {
    const { id } = req.params
    const name = req.body
    const seeker = await models.Seekers.findOne({ where: { id } })

    if (!seeker) return res.status(404).send(`No seeker with the id of "${id}" found`)

    const title = await models.Titles.findOrCreate({ where: { name } })

    await models.SeekersTitles.findOrCreate({ where: { seekerId: id, titleId: title.id } })

    return res.status(201).send(seeker)
  } catch (error) {
    return res.status(500).send('Unable to assign seeker title, please try again')
  }
}

const patchSeeker = async (req, res) => {
  try {
    const { id, property } = req.params
    const val = req.body

    const seeker = await models.Seekers.findOne({ where: { id } })

    if (!seeker) return res.status(404).send(`No seeker with the id of "${id}" found`)

    await models.Seekers.update({ [property]: val }, { where: { id } })

    return res.send(seeker)
  } catch (error) {
    return res.status(500).send('Unable to patch seeker, please try again')
  }
}

const deleteSeeker = async (req, res) => {
  try {
    const { id } = req.params

    const seeker = await models.Seekers.findOne({ where: { id } })

    if (!seeker) return res.status(404).send(`No seeker with the id of "${id}" found`)

    await models.Seekers.destroy({ where: { id } })

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete seeker, please try again')
  }
}

const deleteSeekerTitle = async (req, res) => {
  try {
    const { id, titleId } = req.params

    const seeker = await models.Seekers.findOne({ where: { id } })

    if (!seeker) return res.status(404).send(`No seeker with the id of "${id}" found`)

    const title = await models.Titles.findOne({ where: { id: titleId } })

    if (!title) return res.status(404).send(`No title with the id of "${titleId}" found`)

    await models.SeekersTitles.destroy({ where: { seekerId: id, titleId } })

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete seeker title, please try again')
  }
}

module.exports = {
  getAllSeekersWithTitles,
  getSeekersByTitleId,
  getSeekerByIdWithTitles,
  saveNewSeeker,
  assignSeekerTitle,
  patchSeeker,
  deleteSeeker,
  deleteSeekerTitle,
}
