const flourishflora = (connection, Sequelize) => {
  return connection.define('flourishflora', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('common', 'uncommon', 'rare', 'legendary', 'unique') },
    producerCoefficient: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

module.exports = flourishflora
