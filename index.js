const express = require('express')
const Path = require('path')
const { setLocals } = require('./middlewares/documentation')
const { checkRequiredGoalFields, checkGoalCodeUnique, parseGoalCode } = require('./middlewares/goals')
const { checkRequiredSeekerFields, parseSeekerPatchInput } = require('./middlewares/seekers')
const { checkSampleRoute, checkSampleStatus, validateSaveInput, validatePatchInput } = require('./middlewares/samples')
const { parseNewLocationThreat } = require('./middlewares/locations')
const { setTerritoryValues, checkTerritoryUnique } = require('./middlewares/territories')
const { getAllGuidelines } = require('./controllers/guidelines')
const {
  getAllGoals, getGoalByCode, saveNewGoal, replaceGoal, patchGoalCode, deleteGoal
} = require('./controllers/goals')
const {
  getAllSeekersWithTitles, getSeekersByTitleId, getSeekerByIdWithTitles,
  saveNewSeeker, assignSeekerTitle, patchSeeker, deleteSeeker, deleteSeekerTitle
} = require('./controllers/seekers')
const { getSampleBySlug, saveNewSample, patchSample, deleteSample } = require('./controllers/samples')
const {
  getAllLocations, getLocationBySlug, saveNewTerritoryToLocation,
  patchLocationThreat, deleteTerritory
} = require('./controllers/locations')
const { getDocView } = require('./controllers/documentation')

const app = express()

app.use('/public', express.static(Path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/documentation/:section/:family?', setLocals, getDocView)

app.get('/general/goals', getAllGoals)

app.get('/general/goals/:code', getGoalByCode)

app.post('/general/goals', express.json(), checkRequiredGoalFields, checkGoalCodeUnique, saveNewGoal)

app.put('/general/goals/:code', parseGoalCode, checkGoalCodeUnique, replaceGoal)

app.patch('/general/goals/:code', parseGoalCode, checkGoalCodeUnique, patchGoalCode)

app.delete('/general/goals/:code', deleteGoal)

app.get('/general/guidelines', getAllGuidelines)

app.get('/seekers', getAllSeekersWithTitles)

app.get('/seekers/lodestars/:lodestar', getAllSeekersWithTitles)

app.get('/seekers/title/:id', getSeekersByTitleId)

app.get('/seekers/:id', getSeekerByIdWithTitles)

app.post('/seekers', express.json(), checkRequiredSeekerFields, saveNewSeeker)

app.post('/seekers/:id', assignSeekerTitle)

app.patch('/seekers', parseSeekerPatchInput, patchSeeker)

app.delete('/seekers', deleteSeeker)

app.delete('/seekers/:id/:titleId', deleteSeekerTitle)

app.get('/collection/:family?/:slug?', checkSampleRoute, getSampleBySlug)

app.post('/collection', express.json(), validateSaveInput, saveNewSample)

app.patch('/collection', checkSampleStatus, validatePatchInput, patchSample)

app.delete('/collection', checkSampleStatus, deleteSample)

app.get('/map/locations', getAllLocations)

app.get('/map/locations/:slug', getLocationBySlug)

app.post('/map/location/:slug',
  express.json(), setTerritoryValues, checkTerritoryUnique, saveNewTerritoryToLocation)

app.patch('/map/locations/:slug', parseNewLocationThreat, patchLocationThreat)

app.delete('/map/locations/:slug/:territorySlug', deleteTerritory)

app.get(/\/(documentation)?/, (req, res) => { res.redirect('/documentation/root') })

app.all('*', (req, res) => { res.sendStatus(404) })

app.listen(16361, () => {
  console.log('Listening on port 16361...')
})
