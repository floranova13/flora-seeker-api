const express = require('express')
const { setLocals, checkRoute } = require('./middlewares/documentation')
const { getDocView } = require('./controllers/documentation')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/documentation/:section/:family?', setLocals, checkRoute, getDocView)

app.get('*', (req, res) => { res.sendStatus('404') })

app.listen(16361, () => {
  console.log('Listening on port 16361...') // eslint-disable-line no-console
})
