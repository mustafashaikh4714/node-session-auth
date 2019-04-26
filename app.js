require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

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
app.set('view engine', 'hbs')
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

require('./routes/index')(app)

app.listen(PORT, () => {
  console.log('Listen on port', PORT)
})

module.exports = { app }
