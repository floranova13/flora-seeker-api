const sanitize = str => str.replace(/[^\w\s]/g, '')

const makeSlug = arr => arr.toLowerCase().join('-')

const toTitleCase = arr => arr.map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())

module.exports = { sanitize, makeSlug, toTitleCase }
