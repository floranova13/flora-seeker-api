const express = require('express')
const Path = require('path')
const { setLocals, checkRoute } = require('./middlewares/documentation')
const {
  checkGoalsRoute, checkGoalExists, checkRequiredGoalFields, checkGoalCodeUnique, parseGoalCode
} = require('./middlewares/general/goals')
const {
  checkSeekersRoute, checkSeekerExists, checkRequiredSeekerFields
} = require('./middlewares/seekers')
const { checkLocationsRoute, checkLocationExists, parseNewLocationThreat } = require('./middlewares/map/locations')
const { setTerritoryValues, checkTerritoryUnique, checkTerritoryExists } = require('./middlewares/map/territories')
const { getAllGuidelines } = require('./controllers/general/guidelines')
const {
  getGoalByCode, saveNewGoal, replaceGoal, patchGoalCode, deleteGoal
} = require('./controllers/general/goals')
const {
  getSeekerByIdWithTitles, saveNewSeeker, assignSeekerTitle, deleteSeekerTitle, deleteSeeker
} = require('./controllers/seekers')
const {
  getLocationBySlug, saveNewTerritoryToLocationBySlug, patchLocationThreat, deleteTerritoryByLocationSlug
} = require('./controllers/map/locations')
const { getDocView } = require('./controllers/documentation')

const app = express()
// const router = express.Router()

app.use('/public', express.static(Path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/documentation/:section/:family?', setLocals, checkRoute, getDocView)

// '/' route needs to go to a main page

app.get('/general') // GO SOMEWHERE!

app.get('/general/guidelines', getAllGuidelines)

app.get('/general/goals/:code?', checkGoalsRoute, parseGoalCode, checkGoalExists, getGoalByCode)

app.post('/general/goals', checkRequiredGoalFields, checkGoalCodeUnique, saveNewGoal)

app.put('/general/goals/:code', parseGoalCode, checkGoalExists, replaceGoal)

app.patch('/general/goals/:code', parseGoalCode, checkGoalExists, patchGoalCode)

app.delete('/general/goals/:code', parseGoalCode, checkGoalExists, deleteGoal)

app.post('/general')

app.put('/general')

app.patch('/general')

app.delete('/general')

app.get('/seekers/:id?', checkSeekersRoute, checkSeekerExists, getSeekerByIdWithTitles)

app.post('/seekers', checkRequiredSeekerFields, saveNewSeeker)

app.patch('/seekers',)

app.delete('/seekers',)

app.get('/collection/*')

app.post('/collection')

app.patch('/collection')

app.delete('/collection')

app.get('/map/locations/:slug?', checkLocationsRoute, checkLocationExists, getLocationBySlug)

app.post('/map/location/:slug',
  checkLocationExists, setTerritoryValues, checkTerritoryUnique, saveNewTerritoryToLocationBySlug)

app.patch('/map/locations/:slug', checkLocationExists, parseNewLocationThreat, patchLocationThreat)

app.delete('/map/locations/:slug/:territorySlug',
  checkLocationExists, checkTerritoryExists, deleteTerritoryByLocationSlug)

app.get(/\/(documentation)?/, (req, res) => { res.redirect('/documentation/root') })

app.all('*', (req, res) => { res.sendStatus('404') })

app.listen(16361, () => {
  console.log('Listening on port 16361...')
})
