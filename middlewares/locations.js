const models = require('../models')
const { getAllLocations } = require('../controllers/map/locations')

const checkLocationsRoute = (req, res, next) => {
  try {
    if (!req.params.slug) return getAllLocations(req, res)
    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve param, please try again')
  }
}

const checkLocationExists = async (req, res, next) => {
  try {
    const { slug } = req.params

    const location = await models.Locations.findOne({ where: { slug } })

    if (!location) return res.status(404).send(`no location with the slug of '${slug}' found`)

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve location by slug, please try again')
  }
}

const parseNewLocationThreat = (req, res, next) => {
  try {
    const threat = Number(req.body)

    if (!threat) return res.status(400).send('A location\'s new threat value must be a number')

    req.locals.threat = threat

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve new location threat value, please try again')
  }
}

module.exports = { checkLocationsRoute, checkLocationExists, parseNewLocationThreat }
