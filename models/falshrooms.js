const falshrooms = (connection, Sequelize) => {
  return connection.define('falshrooms', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('common', 'uncommon', 'rare', 'legendary', 'unique') },
    viraburstAbsorption: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

module.exports = falshrooms
