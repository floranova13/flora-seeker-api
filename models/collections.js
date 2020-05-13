const collection = (connection, Sequelize) => {
  return connection.define('collection', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    viraburstAbsorption: { type: Sequelize.INTEGER }
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = collection
