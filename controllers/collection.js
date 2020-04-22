const collection = require('../seekerData').collection

const getAllSpecies = () => {
  return Object.entries(collection)
    .reduce((acc, cur) => {
      return cur.species ? acc.concat(cur.species) : acc
    }, [])
}


module.exports = { getAllSpecies }
