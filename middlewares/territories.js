const models = require('../models')
const { sanitize, toTitleCase, makeSlug } = require('./helpers')

const setTerritoryValues = async (req, res, next) => {
  try {
    let input = req.body.split(' ').map(str => sanitize(str))
    const { slug } = req.params

    const location = await models.Locations.findOne({ where: { slug } })

    if (!location) return res.status(404).send(`No location with the slug of "${slug}" found`)

    req.locals.name = toTitleCase(input).join(' ')
    req.locals.slug = makeSlug(input)
    req.locals.locationId = location.id

    next()
  } catch (error) {
    return res.status(500).send('Unable to set territory locals, please try again')
  }
}

const checkTerritoryUnique = async (req, res, next) => {
  try {
    const { slug, locationId } = req.locals

    const territory = await models.Territories.findOne({ where: { slug, locationId } })

    if (territory) res.status(400).send(`Territory "${slug}" already exists`)

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve territory list, please try again')
  }
}

module.exports = { setTerritoryValues, checkTerritoryUnique }
