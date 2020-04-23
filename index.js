const express = require('express')
const path = require('path')
const seekerData = require('./seekerData')
const documentation = require('./documentation')
// const { getAllTeams, getTeamById } = require('./controllers/teams')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

/*
app.get('/', (request, response) => {
  response.redirect('/documentation/root/0')
})
*/

app.get('/documentation/collection/:family/:num?', (request, response) => {
  const pathDir = '/documentation/'
  let redirectReq = false

  // console.log(pathDir)
  const entityName = 'collection'
  const entity = documentation.collection
  let familyName = request.params.family
  let family = entity[familyName]
  let num = parseInt(request.params.num)

  if (!family) {
    familyName = 'falshrooms'
    family = entity.falshrooms
    redirectReq = true
  }

  const reqItem = family[num]

  if (!reqItem) {
    redirectReq = true
    num = 0
  }

  // if (redirectReq) console.log(`Redirected once: ${familyName} ${num}`)
  if (redirectReq) return response.redirect(`${pathDir}${familyName}/${num}`)

  response.render('index', {
    pathDir, entityName, entity, familyName, family, num
  })
})

app.get('/documentation/:entity/:num', (request, response) => {
  const pathDir = '/documentation/'
  let redirectReq = false

  console.log('Path: ' + pathDir)
  let entityName = request.params.entity
  let entity = documentation[entityName]

  console.log(`Entity: ${entity}`)
  let num = parseInt(request.params.num)

  console.log(`Num: ${num}`)

  if (!entity) {
    redirectReq = true
    entityName = 'root'
    entity = documentation.root
  }

  const reqItem = entity[num]

  if (!reqItem) {
    redirectReq = true
    num = 0
  }

  // ADD CUSTOM 404s FOR EACH FAILURE
  if (redirectReq) console.log(`Redirected once: ${entityName} ${num}`)
  if (redirectReq) return response.redirect(`${pathDir}${entityName}/${num}`)

  response.render('index', { pathDir, entityName, entity, num })
})

app.get('*', (request, response) => {
  return response.status('404').send('404, Page not found.') // MAKE A CUSTOM 404
})

app.listen(16361, () => {
  console.log('Listening on port 16361...') // eslint-disable-line no-console
})
