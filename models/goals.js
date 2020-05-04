const goals = (connection, Sequelize) => {
  return connection.define('goals', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    code: { type: Sequelize.STRING }
  }, { paranoid: true })
}

module.exports = goals
