const falshrooms = (connection, Sequelize, Samples) => {
  return connection.define('falshrooms', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sampleId: { type: Sequelize.INTEGER, references: { model: Samples, key: 'id' } },
    viraburstAbsorption: { type: Sequelize.INTEGER },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = falshrooms
