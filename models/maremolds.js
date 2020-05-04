const maremolds = (connection, Sequelize) => {
  return connection.define('maremolds', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('common', 'uncommon', 'rare', 'legendary', 'unique') },
    mutationRate: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

module.exports = maremolds
