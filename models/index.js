const Sequelize = require('sequelize')
const goalsModel = require('./goals')
const seekersModel = require('./seekers')
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

const Goal = goalsModel(connection, Sequelize)
const Seeker = seekersModel(connection, Sequelize)
const Falshroom = falshroomsModel(connection, Sequelize)
const Flesherfungus = flesherfungiModel(connection, Sequelize)
const Flourishflora = flourishfloraModel(connection, Sequelize)
const Maremold = maremoldsModel(connection, Sequelize)
const Tree = treesModel(connection, Sequelize)
const Waveskell = waveskellenModel(connection, Sequelize)
const Location = locationsModel(connection, Sequelize)
const Territory = territoriesModel(connection, Sequelize)

Location.hasMany(Territory, { foreignKey: 'locationId', sourceKey: 'id' }, { as: 'territories' })
Territory.belongsTo(Location, { foreignKey: 'locationid', targetKey: 'id' })

module.exports = {
  Goal, Seeker, Falshroom, Flesherfungus, Flourishflora, Maremold, Tree, Waveskell, Location, Territory
}
