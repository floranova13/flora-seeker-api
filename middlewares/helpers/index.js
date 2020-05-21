const sanitize = str => str.replace(/[^0-9a-z]/gi, '')

const makeSlug = arr => arr.toLowerCase().join('-')

const toTitleCase = arr => arr.map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())

module.exports = { sanitize, makeSlug, toTitleCase }
