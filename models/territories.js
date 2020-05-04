const territories = (connection, Sequelize) => {
  return connection.define('territories', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    locationId: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

module.exports = territories
