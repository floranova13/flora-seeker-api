const models = require('../../models')

const getAllSeekers = async (req, res) => {
  try {
    const seekers = await models.Seeker.findAll({ attributes: ['id', 'name', 'age', 'gender', 'title', 'lodestar'] })

    return res.send(seekers)
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker list, please try again')
  }
}

const getSeekerById = async (req, res) => {
  try {
    const { id } = req.params
    const seeker = await models.Seeker.findOne({
      where: { id },
      attributes: ['id', 'name', 'age', 'gender', 'title', 'lodestar']
    })

    return seeker
      ? res.send(seeker)
      : res.status(404).send(`no seeker with the id of '${id}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve seeker, please try again')
  }
}

const saveNewSeeker = async (req, res) => {
  try {
    const {
      name, age, gender, title, lodestar
    } = req.body

    const seeker = await models.Seeker.create({
      name, age, gender, title, lodestar
    })

    return res.status(201).send(seeker)
  } catch (error) {
    return res.status(500).send('Unable to save seeker, please try again')
  }
}

module.exports = { getAllSeekers, getSeekerById, saveNewSeeker }
