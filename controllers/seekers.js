const models = require('../models')

const getAllSeekersWithTitles = async (req, res) => {
  try {
    const seekers = await models.Seekers.findAll()

    return res.send(seekers)
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker list, please try again')
  }
}

const getSeekerByIdWithTitles = async (req, res) => {
  try {
    const { id } = req.params

    const seeker = await models.Seekers.findOne({ where: { id } })

    return seeker
      ? res.send(seeker)
      : res.status(404).send(`no seeker with the id of '${id}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker, please try again')
  }
}

const saveNewSeeker = async (req, res) => {
  try {
    const { name, age, gender, lodestar } = req.locals

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

    let title = await models.Titles.findOne({ where: { name } })
    let seekerTitle

    if (!title) {
      title = await models.Titles.create({ where: { name } })
    }

    seekerTitle = await models.SeekersTitles.create({ id, titleId: title.id }) // MAKE SURE NOT ALREADY ASSIGNED, USING MIDDLEWARES

    return res.status(201).send(seekerTitle)
  } catch (error) {
    return res.status(500).send('Unable to save seeker, please try again')
  }
}

const patchSeeker = async (req, res) => {
  try {
    const { id, property } = req.locals
    const { val } = req.locals

    const success = await models.Seekers.upsert({ id, [property]: val })

    return success
      ? res.sendStatus(204)
      : res.status(404).send(`no seeker with the code of '${val}' found`)
  } catch (error) {
    return res.status(500).send('Unable to patch goal code, please try again')
  }
}

const deleteSeekerTitle = async (req, res) => {
  try {
    const seekerId = req.params.id
    const titleId = req.params.titleId

    const seekerTitle = await models.SeekersTitles.findOne({ where: { seekerId, titleId } })

    await seekerTitle.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete seeker title, please try again')
  }
}

const deleteSeeker = async (req, res) => {
  try {
    const id = req.params.id

    const seeker = await models.Seekers.findOne({ where: { id } })

    await seeker.destroy()

    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).send('Unable to delete seeker, please try again')
  }
}


module.exports = {
  getAllSeekersWithTitles,
  getSeekerByIdWithTitles,
  saveNewSeeker,
  assignSeekerTitle,
  patchSeeker,
  deleteSeekerTitle,
  deleteSeeker
}
