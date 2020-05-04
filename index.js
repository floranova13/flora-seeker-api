const express = require('express')
const Path = require('path')
const { setLocals, checkRoute } = require('./middlewares/documentation')
const { getDocView } = require('./controllers/documentation')

const app = express()

app.use('/public', express.static(Path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.get('/documentation/:section/:family?', setLocals, checkRoute, getDocView)

app.get(/\/(documentation)?/, (req, res) => { res.redirect('/documentation/root') })

app.all('*', (req, res) => { res.sendStatus('404') })

app.listen(16361, () => {
  console.log('Listening on port 16361...') // eslint-disable-line no-console
})
