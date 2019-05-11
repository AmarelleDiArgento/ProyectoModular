var express = require('express');
var router = express.Router();

var rol = require('../Modules/rol')


//create rol
router.post('/createrol', function (req, res, next) {
  var rolData = {
    name: req.body.name
  }
  rol.createrol(rolData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update rol
router.put('/updaterol', function (req, res, next) {
  var rolData = {
    rol_id: req.body.rol_id,
    name: req.body.name
  }
  rol.updateRol(rolData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//delete rol
router.delete('/deleterol', function (req, res, next) {
  var rolData = {
    rol_id: req.body.rol_id
  }
  rol.deleteRol(rolData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get rol x id
router.post('/getdatarol', function (req, res, next) {
  var rolData = {
    rol_id: req.body.rol_id
  }
  rol.dataRol(rolData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all rol 
router.get('/getdatarols', function (req, res, next) {
  var rolData = {}
  rol.dataAllRol(rolData, function (error, data) {
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
