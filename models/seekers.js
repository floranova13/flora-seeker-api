const seekers = (connection, Sequelize) => {
  return connection.define('seekers', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER },
    gender: { type: Sequelize.ENUM('female', 'male', 'other') },
    lodestar: { type: Sequelize.BOOLEAN }
  }, {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = seekers
