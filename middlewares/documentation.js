const documentation = require('../documentation')

const setLocals = (req, res, next) => {
  const { section, family, num } = req.params

  res.locals.pathDir = '/documentation/'
  res.locals.section = section
  res.locals.sectionVal = documentation[section]
  res.locals.num = parseInt(num)
  res.locals.family = family
  res.locals.familyVal = res.locals.sectionVal ? res.locals.sectionVal[family] : undefined

  next()
}

const checkRoute = (req, res, next) => {
  if (!res.locals.sectionVal) {
    return res.status('404').send(`no section '${res.locals.section}' found!`)
  }
  if (res.locals.family) {
    if (res.locals.family && !res.locals.familyVal) {
      return res.status('404').send(`no collection family '${res.locals.family} found'`)
    }
    if (res.locals.family && !res.locals.familyVal[res.locals.num]) {
      return res.status('404').send(`no request in '${res.locals.family}' of number '${res.locals.num} found'`)
    }
  }
  else if (!res.locals.sectionVal[res.locals.num]) {
    return res.status('404').send(`no request in '${res.locals.section}' of number '${res.locals.num} found'`)
  }

  next()
}

module.exports = { setLocals, checkRoute }
