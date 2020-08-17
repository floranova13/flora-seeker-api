const territories = (connection, Sequelize, Locations) => {
  return connection.define('territories', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING },
    locationId: { type: Sequelize.INTEGER, references: { model: Locations, key: 'id' } },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = territories
