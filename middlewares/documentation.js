const documentation = require('../documentation')

const setLocals = (req, res, next) => {
  try {
    const { section, family } = req.params
    const familyList = ['falshrooms', 'flesherfungi', 'flourishflora', 'maremolds', 'trees', 'waveskellen']

    res.locals = {
      pathDir: '/documentation/',
      section: section,
      sectionVal: documentation[section],
      family: family,
    }
    res.locals.familyVal =
      familyList.includes(res.locals.family) && res.locals.sectionVal
        ? res.locals.sectionVal[family] : undefined

    if (!res.locals.sectionVal) {
      return res.status(404).send(`No section "${res.locals.section}" found!`)
    }
    if (res.locals.family && !res.locals.familyVal) {
      return res.status(404).send(`No collection family "${res.locals.family}" found`)
    }

    next()
  } catch (error) {
    return res.status(500).send('Unable to set documentation locals, please try again')
  }
}

module.exports = { setLocals }
