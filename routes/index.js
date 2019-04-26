module.exports = app => {
  const users = [
    { userId: 1, name: 'max', email: 'max@gmail.com', password: '12345tc' },
    { userId: 2, name: 'sam', email: 'sam@gmail.com', password: '13345tc' },
    { userId: 3, name: 'alex', email: 'alex@gmail.com', password: '22345tc' }
  ]
  app.get('/', (req, res) => {
    let { userId } = req.session
    res.render('index', userId)
  })
  app.get('/home', (req, res) => {
    res.render('home')
  })
  app.get('/login', (req, res) => {
    res.render('login')
  })
  app.get('/register', (req, res) => {
    res.render('register')
  })
  app.post('/login', (req, res) => {})
  app.post('/register', (req, res) => {})
  app.post('/logout', (req, res) => {})
}
