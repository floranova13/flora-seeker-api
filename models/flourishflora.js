const flourishflora = (connection, Sequelize, Samples) => {
  return connection.define('flourishflora', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sampleId: { type: Sequelize.INTEGER, references: { model: Samples, key: 'id' } },
    producerCoefficient: { type: Sequelize.DECIMAL },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = flourishflora
