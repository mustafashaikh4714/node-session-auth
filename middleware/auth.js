module.exports = redirectToLogin = (req, res, done) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    done()
  }
}
module.exports = redirectToHome = (req, res, done) => {
  if (req.session.userId) {
    res.redirect('/home')
  } else {
    done()
  }
}
