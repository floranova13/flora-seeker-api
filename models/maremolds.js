const maremolds = (connection, Sequelize, Samples) => {
  return connection.define('maremolds', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sampleId: { type: Sequelize.INTEGER, references: { model: Samples, key: 'id' } },
    mutationRate: { type: Sequelize.INTEGER }
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = maremolds
