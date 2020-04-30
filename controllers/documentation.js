const seekerData = require('../seekerData')

const getDocView = (req, res) => {
  const description = seekerData[res.locals.section].description

  return res.render('index', { description })
}

module.exports = { getDocView }
