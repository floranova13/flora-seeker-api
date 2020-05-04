const seekers = (connection, Sequelize) => {
  return connection.define('seekers', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    age: { type: Sequelize.INTEGER },
    gender: { type: Sequelize.ENUM('female', 'male', 'other') },
    title: { type: Sequelize.STRING },
    lodestar: { type: Sequelize.BOOLEAN }
  }, { paranoid: true })
}

module.exports = seekers
