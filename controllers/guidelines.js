const models = require('../models')

const getAllGuidelines = async (req, res) => {
  try {
    const guidelines = await models.Guidelines.findAll()

    return res.send(guidelines)
  } catch (error) {
    return res.status(500).send('Unable to retrieve guideline list, please try again')
  }
}

module.exports = { getAllGuidelines }
