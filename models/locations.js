/* const locations = (connection, Sequelize) => {
  return connection.define('locations', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    territories: { type: Sequelize.ARR}
  }, { paranoid: true })
}
*/

const samples = (connection, Sequelize) => {
  return connection.define('waveskellen', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    // X: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

const falshrooms = (connection, Sequelize) => {
  return connection.define('falshrooms', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    viraburstAbsorption: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

const flesherfungi = (connection, Sequelize) => {
  return connection.define('flesherfungi', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    threat: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

const flourishflora = (connection, Sequelize) => {
  return connection.define('flourishflora', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    producerCoefficient: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

const maremolds = (connection, Sequelize) => {
  return connection.define('maremolds', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    mutationRate: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

const trees = (connection, Sequelize) => {
  return connection.define('trees', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    height: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

const waveskellen = (connection, Sequelize) => {
  return connection.define('waveskellen', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    rarity: { type: Sequelize.ENUM('Common', 'Uncommon', 'Rare', 'Legendary', 'Unique') },
    // X: { type: Sequelize.INTEGER }
  }, { paranoid: true })
}

const seeker = (connection, Sequelize) => {
  return connection.define('seeker', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    age: { type: Sequelize.INTEGER },
    gender: { type: Sequelize.ENUM('female', 'male', 'other') },
    title: { type: Sequelize.STRING },
    lodestar: { type: Sequelize.BOOLEAN }
  }, { paranoid: true })
}
