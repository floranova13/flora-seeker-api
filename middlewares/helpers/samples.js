const propertyValid = {
  description: val => val,
  rarity: val => ['common', 'uncommon', 'rare', 'legendary', 'unique'].includes(val),
  viraburstAbsorption: val => Number.isInteger(val),
  threat: val => Number.isInteger(val),
  producerCoefficient: val => !Number.isNaN(val),
  mutationRate: val => Number.isInteger(val),
  height: val => !isNaN(val),
  cascade: val => ['clarion', 'umbra', 'nihil', 'anomalous'].includes(val)
}

const familyProperty = {
  falshrooms: 'viraburstAbsorption',
  flesherfungi: 'threat',
  flourishflora: 'producerCoefficient',
  maremolds: 'mutationRate',
  trees: 'height',
  waveskellen: 'cascade'
}

module.exports = { propertyValid, familyProperty }
