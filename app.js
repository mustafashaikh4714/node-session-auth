require('dotenv').config()
const express = require('express')
const session = require('express-session')

const {
  PORT,
  NODE_ENV,
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_LIFE
} = process.env

const app = express()

const IN_PROD = NODE_ENV === 'production'
// session middleware
app.use(
  session({
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: SESSION_LIFE,
      sameSite: true,
      secure: IN_PROD
    }
  })
)
app.listen(PORT, () => {
  console.log('Listen on port', PORT)
})
