const documentation = require('../documentation')

const setLocals = (req, res, next) => {
  const { section, family } = req.params
  const familyList = ['falshrooms', 'flesherfungi', 'flourishflora', 'maremolds', 'trees', 'waveskellen']

  res.locals.pathDir = '/documentation/'
  res.locals.section = section
  res.locals.sectionVal = documentation[section]
  res.locals.family = family
  res.locals.familyVal = familyList.includes(res.locals.family) && res.locals.sectionVal
    ? res.locals.sectionVal[family] : undefined

  next()
}

const checkRoute = (req, res, next) => {
  if (!res.locals.sectionVal) {
    return res.status('404').send(`no section '${res.locals.section}' found!`)
  }
  if (res.locals.family && !res.locals.familyVal) {
    return res.status('404').send(`no collection family '${res.locals.family}' found`)
  }

  next()
}

module.exports = { setLocals, checkRoute }
