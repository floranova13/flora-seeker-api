const Sequelize = require('sequelize')
const allConfigs = require('../configs/sequelize')
const goalsModel = require('./goals')
const guidelinesModel = require('./guidelines')
const seekersModel = require('./seekers')
const titlesModel = require('./titles')
const seekersTitlesModel = require('./seekersTitles')
const samplesModel = require('./samples')
const locationsModel = require('./locations')
const territoriesModel = require('./territories')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const Goals = goalsModel(connection, Sequelize)
const Guidelines = guidelinesModel(connection, Sequelize)
const Seekers = seekersModel(connection, Sequelize)
const Titles = titlesModel(connection, Sequelize)
const SeekersTitles = seekersTitlesModel(connection, Sequelize, Seekers, Titles)
const Samples = samplesModel(connection, Sequelize)
const Locations = locationsModel(connection, Sequelize)
const Territories = territoriesModel(connection, Sequelize, Locations)

Seekers.belongsToMany(Titles, { through: SeekersTitles })
Titles.belongsToMany(Seekers, { through: SeekersTitles })

Locations.hasMany(Territories)
Territories.belongsTo(Locations)

module.exports = {
  Goals,
  Guidelines,
  Seekers,
  Titles,
  SeekersTitles,
  Samples,
  Locations,
  Territories,
  Op: Sequelize.Op,
  families: ['falshrooms', 'flesherfungi', 'flourishflora', 'maremolds', 'trees', 'waveskellen']
}
