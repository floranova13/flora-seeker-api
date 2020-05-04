const waveskellen = (connection, Sequelize) => {
  return connection.define('waveskellen', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('common', 'uncommon', 'rare', 'legendary', 'unique') },
    cascades: { type: Sequelize.ENUM('clarion', 'umbra', 'nihil', 'anomalous') }
  }, { paranoid: true })
}

module.exports = waveskellen
