const flesherfungi = (connection, Sequelize) => {
  return connection.define('flesherfungi', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    threat: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

module.exports = flesherfungi
