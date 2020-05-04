const models = require('../models')

const getAllLocations = async (req, res) => {
  try {
    let locations = await models.Location.findAll({
      attributes: ['name', 'description', 'slug'],
      include: ['locations']
    })

    return res.send(locations)
  } catch (error) {
    return res.status(500).send('Unable to retrieve location list, please try again')
  }
}

const getLocationBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const location = await models.Location.findOne({
      where: { slug },
      attributes: ['name', 'description', 'slug']
    })

    return location
      ? res.send(location)
      : res.status(404).send(`no location with the slug of '${slug}' found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve location, please try again')
  }
}

const saveNewLocation = async (req, res) => {
  try {
    const {
      name, description, slug
    } = req.body

    const location = await models.Location.create({
      name, description, slug
    })

    return res.status(201).send(location)
  } catch (error) {
    return res.status(500).send('Unable to save location, please try again')
  }
}

module.exports = { getAllLocations, getLocationBySlug, saveNewLocation }
