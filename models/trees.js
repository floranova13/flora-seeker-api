const trees = (connection, Sequelize, Samples) => {
  return connection.define('trees', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sampleId: { type: Sequelize.INTEGER, references: { model: Samples, key: 'id' } },
    height: { type: Sequelize.INTEGER },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = trees
