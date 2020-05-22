const models = require('../models')

const getAllLocations = async (req, res) => {
  try {
    const locations = await models.Locations.findAll({ include: { model: models.Territories } })

    return res.send(locations)
  } catch (error) {
    return res.status(500).send('Unable to retrieve location list, please try again')
  }
}

const getLocationBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const location = await models.Locations.findOne({ include: { model: models.Territories } }, { where: { slug } })

    return location
      ? res.send(location)
      : res.status(404).send(`No location with the slug of "${slug}" found`)
  } catch (error) {
    return res.status(500).send('Unable to retrieve location, please try again')
  }
}

const saveNewTerritoryToLocation = async (req, res) => {
  try {
    const { name, slug, locationId } = req.locals

    await models.Territories.create({ name, slug, locationId })

    return res.status(201).send({ name, slug, locationId })
  } catch (error) {
    return res.status(500).send('Unable to save territory, please try again')
  }
}

const patchLocationThreat = async (req, res) => {
  try {
    const threat = req.locals
    const { slug } = req.params

    const location = await models.Locations.findOne({ where: { slug } })

    if (!location) return res.status(404).send(`No location with the slug of "${slug}" found`)

    await location.update({ threat }, { where: { slug } })

    return res.status.send(location)
  } catch (error) {
    return res.status(500).send('Unable to patch location threat, please try again')
  }
}

const deleteTerritory = async (req, res) => {
  try {
    const { slug, territorySlug } = req.params
    const location = await models.Locations.findOne({ where: { slug } })

    if (!location) return res.status(404).send(`No location with the slug of "${slug}" found`)

    const territory = await models.Territories({ where: { slug: territorySlug, locationId: location.locationId } })

    if (!location) {
      return res.status(404).send(`No territory with the slug of "${territorySlug}" found in ${location.name}`)
    }

    await territory.destroy()

    return res.statusSend(204)
  } catch (error) {
    return res.status(500).send('Unable to delete location territory, please try again')
  }
}

module.exports = {
  getAllLocations, getLocationBySlug, saveNewTerritoryToLocation, patchLocationThreat, deleteTerritory
}
