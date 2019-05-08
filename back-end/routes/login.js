var express = require('express');
var router = express.Router();


var login = require('../Modules/login')

// get auth login
router.post('/auth', function (req, res, next) {
  var userData = {
    email: req.body.email,
    password: req.body.password
  }
  login.getUserLogin(userData, function (error, data) {
    if (error) {
      res.status(501).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

module.exports = router;