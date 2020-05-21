const express = require('express')
const Path = require('path')
const { setLocals, checkRoute } = require('./middlewares/documentation')
const { checkRequiredGoalFields, checkGoalCodeUnique, parseGoalCode } = require('./middlewares/goals')
const { checkRequiredSeekerFields, parseSeekerPatchInput } = require('./middlewares/seekers')
// ADD TITLES??????
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
// ADD TITLES??????
const {
  getAllSamples, getSampleBySlug, saveNewSample, patchSample, deleteSample
} = require('./controllers/samples')
const {
  getAllLocations, getLocationBySlug, saveNewTerritoryToLocation,
  patchLocationThreat, deleteTerritory
} = require('./controllers/locations')
const { getDocView } = require('./controllers/documentation')

const app = express()
// const router = express.Router()

app.use('/public', express.static(Path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/documentation/:section/:family?', setLocals, checkRoute, getDocView)

// '/' route needs to go to a main page

app.get('/general') // GO SOMEWHERE! ???

app.get('/general/goals', getAllGoals) // Checked

app.get('/general/goals/:code', getGoalByCode) // Checked

app.post('/general/goals', express.json(), checkRequiredGoalFields, checkGoalCodeUnique, saveNewGoal) // Checked

app.put('/general/goals/:code', parseGoalCode, checkGoalCodeUnique, replaceGoal) // Checked

app.patch('/general/goals/:code', parseGoalCode, checkGoalCodeUnique, patchGoalCode) // Checked

app.delete('/general/goals/:code', deleteGoal) // Checked

app.get('/general/guidelines', getAllGuidelines) // Checked

app.get('/seekers', getAllSeekersWithTitles) // Checked

app.get('/seekers/title/:id', getSeekersByTitleId)

app.get('/seekers/:id', getSeekerByIdWithTitles) // Checked

app.post('/seekers', express.json(), checkRequiredSeekerFields, saveNewSeeker) // Checked

app.post('/seekers/:id', assignSeekerTitle) // Checked

app.patch('/seekers', parseSeekerPatchInput, patchSeeker)

app.delete('/seekers', deleteSeeker) // Checked

app.delete('/seekers/:id', deleteSeekerTitle) // Checked

app.get('/collection', checkSampleRoute, getAllSamples) // Checked

app.get('/collection/:family/:slug?', checkSampleRoute, getSampleBySlug) // Checked

app.post('/collection', express.json(), validateSaveInput, saveNewSample) // !!!!!!!!!!!!!!!!!!!!!!

app.patch('/collection', checkSampleStatus, validatePatchInput, patchSample) // Checked

app.delete('/collection', checkSampleStatus, deleteSample) // Checked

app.get('/map/locations', getAllLocations) // Checked

app.get('/map/locations/:slug', getLocationBySlug) // Checked

app.post('/map/location/:slug',
  express.json(), setTerritoryValues, checkTerritoryUnique, saveNewTerritoryToLocation) // Checked

app.patch('/map/locations/:slug', parseNewLocationThreat, patchLocationThreat) // Checked

app.delete('/map/locations/:slug/:territorySlug', deleteTerritory) // Checked

app.get(/\/(documentation)?/, (req, res) => { res.redirect('/documentation/root') })

app.all('*', (req, res) => { res.sendStatus('404') })

app.listen(16361, () => {
  console.log('Listening on port 16361...') // eslint-disable-line no-console
})
