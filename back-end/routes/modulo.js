var express = require('express');
var router = express.Router();

var modulo = require('../Modules/modulo')


//create modulo
router.post('/createmodulo', function (req, res, next) {
  var modData = {
    name: req.body.name,
    status: req.body.status
  }
  modulo.createmodulo(modData, function (error, data) {
    console.log(modData);

    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update modulo
router.post('/updatemodulo', function (req, res, next) {
  var modData = {
    modulo_id: req.body.module_id,
    name: req.body.name,
    state: req.body.status
  }
  console.log(req.body.modulo_id);
  
  modulo.updatemodulo(modData, function (error, data) {

    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//delete modulo
router.post('/deletemodulo', function (req, res, next) {
  var modData = {
    modulo_id: req.body.module_id
  }
  modulo.deletemodulo(modData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get modulo x id
router.post('/getdatamodulo', function (req, res, next) {
  var modData = {
    modulo_id: req.body.module_id
  }
  modulo.datamodulo(modData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all modulo 
router.get('/getdatamodulo', function (req, res, next) {
  var modData = {}
  modulo.dataAllmodulo(modData, function (error, data) {
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