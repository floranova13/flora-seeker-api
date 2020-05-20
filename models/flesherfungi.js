const flesherfungi = (connection, Sequelize, Samples) => {
  return connection.define('flesherfungi', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    sampleId: { type: Sequelize.INTEGER, references: { model: Samples, key: 'id' } },
    threat: { type: Sequelize.INTEGER },
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = flesherfungi
