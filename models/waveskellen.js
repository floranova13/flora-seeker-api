const waveskellen = (connection, Sequelize, Samples) => {
  return connection.define('waveskellen', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sampleId: { type: Sequelize.INTEGER, references: { model: Samples, key: 'id' } },
    cascades: { type: Sequelize.ENUM('clarion', 'umbra', 'nihil', 'anomalous') },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = waveskellen
