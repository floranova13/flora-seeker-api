const express = require('express')
const path = require('path')
const seekerData = require('./seekerData')
const documentation = require('./documentation')
// const { getAllTeams, getTeamById } = require('./controllers/teams')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  const entity = documentation.index
  const req = documentation.index[0]

  response.render('index', { entity, req })
})

app.get('/documentation/:entity/:i', (request, response) => {
  const pathDir = path.dirname.toString() + '/'

  console.log(pathDir)
  let entityName = request.params.entity
  let entity = documentation[entityName]

  if (!entity) {
    entityName = 'root'
    entity = documentation.root
  }

  const req = entity[parseInt(request.params.i)] ? entity[parseInt(request.params.i)] : entity[0]

  // change for collections
  // change to correct route if that's what is to be shown anyway

  response.render('index', { entityName, entity, req })
})

app.get('*', (request, response) => {
  return response.status('404').send('404, Page not found.')
})

app.listen(16361, () => {
  console.log('Listening on port 16361...') // eslint-disable-line no-console
})
