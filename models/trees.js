const trees = (connection, Sequelize) => {
  return connection.define('trees', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('common', 'uncommon', 'rare', 'legendary', 'unique') },
    height: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

module.exports = trees
