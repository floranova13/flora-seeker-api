const seekersTitles = (connection, Sequelize, Seekers, Titles) => {
  return connection.define('seekersTitles', {
    seekerId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: Seekers, key: 'id' } },
    titleId: { type: Sequelize.INTEGER, primaryKey: true, references: { model: Titles, key: 'id' } },
  },
  {
    defaultScope: {
      attributes: { exclude: ['deletedAt'] }
    }
  }, { paranoid: true })
}

module.exports = seekersTitles
