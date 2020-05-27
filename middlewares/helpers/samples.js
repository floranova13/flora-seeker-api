const propertyValid = {
  description: val => val || true,
  rarity: val => ['common', 'uncommon', 'rare', 'legendary', 'unique'].includes(val),
  viraburstAbsorption: val => Number.isInteger(parseInt(val, 10)),
  threat: val => Number.isInteger(parseInt(val, 10)),
  producerCoefficient: val => !Number.isNaN(Number(val)),
  mutationRate: val => Number.isInteger(parseInt(val, 10)),
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
