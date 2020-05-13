const Sequelize = require('sequelize')
const goalsModel = require('./goals')
const seekersModel = require('./seekers')
const titlesModel = require('./titles')
const seekersTitlesModel = require('./seekersTitles')
const samplesModel = require('./samples')
const falshroomsModel = require('./falshrooms')
const flesherfungiModel = require('./flesherfungi')
const flourishfloraModel = require('./flourishflora')
const maremoldsModel = require('./maremolds')
const treesModel = require('./trees')
const waveskellenModel = require('./waveskellen')
const locationsModel = require('./locations')
const territoriesModel = require('./territories')

const connection = new Sequelize('flora_seeker', 'flora', 'flourish', {
  host: 'localhost', dialect: 'mysql'
})

const Goals = goalsModel(connection, Sequelize)
const Seekers = seekersModel(connection, Sequelize)
const Titles = titlesModel(connection, Sequelize)
const SeekersTitles = seekersTitlesModel(connection, Sequelize, Seekers, Titles)
const Samples = samplesModel(connection, Sequelize)
const Falshrooms = falshroomsModel(connection, Sequelize, Samples)
const Flesherfungi = flesherfungiModel(connection, Sequelize, Samples)
const Flourishflora = flourishfloraModel(connection, Sequelize, Samples)
const Maremolds = maremoldsModel(connection, Sequelize, Samples)
const Trees = treesModel(connection, Sequelize, Samples)
const Waveskellen = waveskellenModel(connection, Sequelize, Samples)
const Locations = locationsModel(connection, Sequelize)
const Territories = territoriesModel(connection, Sequelize, Locations)

Seekers.belongsToMany(Titles, { through: SeekersTitles })
Titles.belongsToMany(Seekers, { through: SeekersTitles })

Falshrooms.hasOne(Samples)
Flesherfungi.hasOne(Samples)
Flourishflora.hasOne(Samples)
Maremolds.hasOne(Samples)
Trees.hasOne(Samples)
Waveskellen.hasOne(Samples)

Locations.hasMany(Territories)
Territories.belongsTo(Locations)

// Locations.addScope('minimal', {
//   attributes: ['name', 'description', 'slug'],
//   include: [{ model: Territory, as: 'territories', attributes: ['name'] }]
// })

module.exports = {
  Goals,
  Seekers,
  Titles,
  SeekersTitles,
  Samples,
  Falshrooms,
  Flesherfungi,
  Flourishflora,
  Maremolds,
  Trees,
  Waveskellen,
  Locations,
  Territories
}
