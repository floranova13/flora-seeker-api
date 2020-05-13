const guidelines = (connection, Sequelize) => {
  return connection.define('guidelines', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    description: { type: Sequelize.STRING, allowNull: false }
  }, {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = guidelines
