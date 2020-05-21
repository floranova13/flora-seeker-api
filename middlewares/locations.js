const parseNewLocationThreat = (req, res, next) => {
  try {
    const threat = parseInt(req.body)

    if (!threat) return res.status(400).send('A location\'s new threat value must be an integer')

    req.body = Math.abs(threat)

    next()
  } catch (error) {
    return res.status(500).send('Unable to retrieve new location threat value, please try again')
  }
}

module.exports = { parseNewLocationThreat }
