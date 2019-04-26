const redirectToLogin = (req, res, done) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    done()
  }
}
const redirectToHome = (req, res, done) => {
  if (req.session.userId) {
    res.redirect('/home')
  } else {
    done()
  }
}

module.exports = { redirectToHome, redirectToLogin }
