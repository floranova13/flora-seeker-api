/* eslint-disable max-len */
const chai = require('chai')
const { describe, it } = require('mocha')
const { sanitize, toTitleCase, makeSlug } = require('../../middlewares/helpers')
const { expect } = chai

describe('Helpers - Index', () => {
  describe('sanitize', () => {
    it('takes in a string and removes anything that is not alphanumeric, whitespace, or and underscore character, returning the result.', async () => {
      const result = await sanitize('ADJ4363$@#')

      expect(result).to.equal('ADJ4363')
    })

    it('does not change strings that consist of only alphanumeric characters, whitespace characters, or underscores.', async () => {
      const result = await sanitize('fdAFDSGdjfj')

      expect(result).to.equal('fdAFDSGdjfj')
    })

    it('removes slashes when they are not escaping another character', async () => {
      const result = await sanitize('dgegw/wegwegweg/\wegwgwg') // eslint-disable-line no-useless-escape

      expect(result).to.equal('dgegwwegwegwegwegwgwg')
    })

    it('returns an empty string when there are no valid characters', async () => {
      const result = await sanitize('^&*()$%')

      expect(result).to.equal('')
    })
  })

  describe('makeSlug', () => {
    it('takes an array of strings and returns a lowercase copy of the strings joined by dashes', async () => {
      const result = await makeSlug(['The', 'Fan'])

      expect(result).to.equal('the-fan')
    })

    it('does not change strings that are already in slug form', async () => {
      const result = await makeSlug(['the', 'fan'])

      expect(result).to.equal('the-fan')
    })

    it('does not change an array of a single empty string', async () => {
      const result = await makeSlug([''])

      expect(result).to.equal('')
    })

    it('does not change non-alpha characters', async () => {
      const result = await makeSlug(['FD', '3456'])

      expect(result).to.equal('fd-3456')
    })
  })

  describe('toTitleCase', () => {
    it('takes an array of strings and returns a lowercase copy of the strings joined by spaces, with the first letter of each word capitalized', async () => {
      const result = await toTitleCase(['the', 'FAN'])

      expect(result).to.equal('The Fan')
    })

    it('does not change strings that are already in title case', async () => {
      const result = await toTitleCase(['The', 'Fan'])

      expect(result).to.equal('The Fan')
    })

    it('does not change an array of a single empty string', async () => {
      const result = await toTitleCase([''])

      expect(result).to.equal('')
    })

    it('does not change non-alpha characters', async () => {
      const result = await toTitleCase(['FD', '3456'])

      expect(result).to.equal('Fd 3456')
    })
  })
})
