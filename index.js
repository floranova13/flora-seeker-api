const express = require('express')
const path = require('path') // ADD CUSTOM 404s!!!!!
const { setLocals, checkRoute } = require('./middlewares/documentation')
const { getDocView } = require('./controllers/documentation')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/documentation/:section/:family?/:num', setLocals, checkRoute, getDocView)

app.get('*', (req, res) => { res.status('404').send('404, Page not found.') })

app.listen(16361, () => {
  console.log('Listening on port 16361...') // eslint-disable-line no-console
})
