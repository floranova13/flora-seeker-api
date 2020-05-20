const models = require('../models')

const setTerritoryValues = async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send('Invalid territory name')

    let input = req.body.split(' ')
    const { slug } = req.params
    const location = await models.Locations.findOne({ where: { slug } })

    req.locals.name = input.map(str => str.replace(/[^0-9a-z]/gi, '')).join(' ')
    req.locals.slug = req.locals.name.toLowercase().split(' ').join('-')
    req.locals.locationId = location.id

    next()
  } catch (error) {
    return res.status(500).send('Unable to set territories locals, please try again')
  }
}

const checkTerritoryUnique = async (req, res, next) => {
  try {
    const { slug, locationId } = req.locals

    const territory = await models.Territories.findOne({ where: { slug, locationId } })

    if (territory) res.status(400).send(`territory '${slug}' already exists`)

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve param, please try again')
  }
}

const checkTerritoryExists = async (req, res, next) => {
  try {
    const { slug, territorySlug } = req.params

    const location = await models.Locations.findOne({ where: { slug } })
    const territory = await models.Territories.findOne({
      where: { slug: territorySlug, locationId: location.locationId }
    })

    if (!territory) res.status(400).send(`No territory of slug '${territorySlug}'`)

    next()
  } catch (error) {
    return res.status(500).send('Unable retrieve location territories, please try again')
  }
}

module.exports = { setTerritoryValues, checkTerritoryUnique, checkTerritoryExists }
