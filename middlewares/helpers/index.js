const sanitize = str => str.replace(/[^0-9a-z]/gi, '')

const makeSlug = str => str.toLowerCase().split(' ').join('-')

const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

module.exports = { sanitize, makeSlug, toTitleCase }
