/* eslint-disable max-len */
const chai = require('chai')
const { describe, it } = require('mocha')
const { propertyValid } = require('../../middlewares/helpers/samples')
const { expect } = chai

describe('Helpers - Samples', () => {
  describe('propertyValid', () => {
    it('runs an anonymous predicate function based on the key passed in to check against, returning whether the input is in the desired form', () => {
      const result = propertyValid['description']('')

      expect(result).to.equal(true)
    })

    it('returns true if the key is "rarity" and the value is "common", "uncommon", "rare", "legendary", or "unique"', async () => {
      const result = propertyValid['rarity']('legendary')

      expect(result).to.equal(true)
    })

    it('returns true if the key is "viraburstAbsorption" and the value is an integer', async () => {
      const result = propertyValid['viraburstAbsorption']('6')

      expect(result).to.equal(true)
    })

    it('returns true if the key is "threat" and the value is an integer', async () => {
      const result = propertyValid['threat']('1')

      expect(result).to.equal(true)
    })

    it('returns true if the key is "producerCoefficient" and the value is a number', async () => {
      const result = propertyValid['producerCoefficient']('1.5')

      expect(result).to.equal(true)
    })

    it('returns true if the key is "mutationRate" and the value is an integer', async () => {
      const result = propertyValid['mutationRate']('345')

      expect(result).to.equal(true)
    })

    it('returns true if the key is "height" and the value is a number', async () => {
      const result = propertyValid['height']('231')

      expect(result).to.equal(true)
    })

    it('returns true if the key is "cascade" and the value is "clarion", "nihil", "umbra", or "anomalous"', async () => {
      const result = propertyValid['cascade']('clarion')

      expect(result).to.equal(true)
    })

    it('returns false if the key is "rarity" and the value is not "common", "uncommon", "rare", "legendary", or "unique"', async () => {
      const result = propertyValid['rarity']('super rare')

      expect(result).to.equal(false)
    })

    it('returns false if the key is "viraburstAbsorption" and the value is not an integer', async () => {
      const result = propertyValid['viraburstAbsorption']('A')

      expect(result).to.equal(false)
    })

    it('returns false if the key is "threat" and the value is not an integer', async () => {
      const result = propertyValid['threat']('A')

      expect(result).to.equal(false)
    })

    it('returns false if the key is "producerCoefficient" and the value is not a number', async () => {
      const result = propertyValid['producerCoefficient']('A')

      expect(result).to.equal(false)
    })

    it('returns false if the key is "mutationRate" and the value is not an integer', async () => {
      const result = propertyValid['mutationRate']('A')

      expect(result).to.equal(false)
    })

    it('returns false if the key is "height" and the value is not a number', async () => {
      const result = propertyValid['height']('A')

      expect(result).to.equal(false)
    })

    it('returns false if the key is "cascade" and the value is not "clarion", "nihil", "umbra", or "anomalous"', async () => {
      const result = propertyValid['cascade']('empty')

      expect(result).to.equal(false)
    })
  })
})
