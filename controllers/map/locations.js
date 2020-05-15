const models = require('../../models')

const getAllLocations = async (req, res) => {
  try {
    const locations = await models.Locations.findAll()

    return res.send(locations)
  } catch (error) {
    return res.status(500).send('Unable to retrieve location list, please try again')
  }
}

const getLocationBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const location = await models.Locations.findOne({ where: { slug } })

    return res.send(location)
  } catch (error) {
    return res.status(500).send('Unable to retrieve location, please try again')
  }
}

const saveNewTerritoryToLocationBySlug = async (req, res) => {
  try {
    const { name, slug, locationId } = req.locals

    const territory = await models.Territories.create({ name, slug, locationId })

    return res.status(201).send(territory)
  } catch (error) {
    return res.status(500).send('Unable to save territory, please try again')
  }
}

const patchLocationThreat = async (req, res) => {
  try {
    const threat = req.locals
    const { slug } = req.params

    const location = await models.Locations.findOne({ where: { slug } })

    const success = await location.upsert({ threat })

    return success
      ? res.status.send(location)
      : res.status(400).send(`invalid location threat '${threat}'`)
  } catch (error) {
    return res.status(500).send('Unable to patch location threat, please try again')
  }
}

const deleteTerritoryByLocationSlug = async (req, res) => {
  try {
    const { slug, territorySlug } = req.params

    const location = await models.Locations.findOne({ where: { slug } })

    await models.Territories.destroy({
      where: { slug: territorySlug, locationId: location.locationId }
    })

    return res.statusSend(204)
  } catch (error) {
    return res.status(500).send('Unable to delete location territory, please try again')
  }
}

module.exports = {
  getAllLocations,
  getLocationBySlug,
  saveNewTerritoryToLocationBySlug,
  patchLocationThreat,
  deleteTerritoryByLocationSlug
}
