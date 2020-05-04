const locations = (connection, Sequelize) => {
  return connection.define('locations', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING }
  }, { paranoid: true })
}

module.exports = locations
