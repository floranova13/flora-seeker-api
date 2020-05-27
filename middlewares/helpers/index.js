const sanitize = str => str.replace(/[^\w\s]/g, '')

const makeSlug = arr => arr.map(str => str.toLowerCase()).join('-')

const toTitleCase = arr => arr.map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ')

module.exports = { sanitize, makeSlug, toTitleCase }
