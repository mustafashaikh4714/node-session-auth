require('dotenv').config()
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const {
  PORT,
  NODE_ENV,
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_LIFE
} = process.env

const app = express()

const IN_PROD = NODE_ENV === 'production'
// middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// app.set('views', './routes')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
// session middleware
app.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      sameSite: true,
      secure: IN_PROD
    }
  })
)

require('events').EventEmitter.defaultMaxListeners = 15
require('./routes/index')(app)

app.listen(PORT, () => {
  console.log('Listen on port', PORT)
})

module.exports = { app }
