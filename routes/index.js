const { redirectToLogin, redirectToHome } = require('../middleware/auth')
module.exports = app => {
  const users = [
    { userId: 1, name: 'max', email: 'max@gmail.com', password: '12345tc' },
    { userId: 2, name: 'sam', email: 'sam@gmail.com', password: '13345tc' },
    { userId: 3, name: 'alex', email: 'alex@gmail.com', password: '22345tc' }
  ]
  app.get('/', (req, res) => {
    let { userId } = req.session
    res.render('main', userId)
  })

  app.get('/home', redirectToLogin, (req, res) => {
    res.render('home')
  })

  app.get('/login', redirectToHome, (req, res) => {
    res.render('login')
  })

  app.get('/register', redirectToHome, (req, res) => {
    res.render('register')
  })

  app.post('/login', redirectToHome, (req, res) => {
    let { email, password } = req.body
    if (email && password) {
      const user = users.find(
        user => user.email === email && user.password === password
      )
      if (user) {
        req.session.userId = user.id
        return res.render('/home', user)
      }
      return res.redirect('/login')
    }
  })

  app.post('/register', redirectToHome, (req, res) => {
    let { name, email, password } = req.body
    if (name && email && password) {
      // check if user already exists!
      const exists = users.some(user => user.email === email)
      if (!exists) {
        // register new user to database
        const user = {
          id: users.length + 1,
          name,
          email,
          password
        }

        users.push(user)
        req.session.userId = user.id
        return res.redirect('/home')
      }

      return res.redirect('/register')
    }
  })
  app.post('/logout', redirectToLogin, (req, res) => {
    req.session.destroy(err => {
      if (err) res.redirect('/home')

      res.clearCookie(process.env.SESSION_NAME)
      res, redirect('/login')
    })
  })
}
