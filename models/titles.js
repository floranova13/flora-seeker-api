const titles = (connection, Sequelize) => {
  return connection.define('titles', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false }
  }, {
    defaultScope: {
      attributes: ['id', 'name']
    }
  }, { paranoid: true })
}

module.exports = titles
