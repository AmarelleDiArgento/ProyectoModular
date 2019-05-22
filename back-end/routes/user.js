var express = require('express');
var router = express.Router();

var user = require('../Modules/user')


//create user
router.post('/createuser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    rol_id: req.body.rol_id,
    status: req.body.status
  }
  user.createUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//update user
router.post('/updateuser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    rol_id: req.body.rol_id,
    status: req.body.status
  }
  user.updateUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//delete user
router.post('/deleteuser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id
  }
  user.deleteUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//get user x id
router.post('/getdatauser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id
  }
  user.dataUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get pod user
router.post('/getdatapoduser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id
  }
  user.dataPodUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all user 
router.get('/getdatauser', function (req, res, next) {
    var userData = {}
    user.dataAllUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

module.exports = router;