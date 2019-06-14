var express = require('express');
var router = express.Router();

var privilege = require('../Modules/privilege')


//create privilege
router.post('/createprivilege', function (req, res, next) {
  var priData = {
    name: req.body.name,
    module_id: req.body.module_id,
    icon: req.body.icon,
    route: req.body.route,
    status: req.body.status
  }
  console.log('Route' + priData.status);

  privilege.createprivilege(priData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update privilege
router.post('/updateprivilege', function (req, res, next) {
  var priData = {
    privilege_id: req.body.privilege_id,
    name: req.body.name,
    module_id: req.body.module_id,
    icon: req.body.icon,
    route: req.body.route,
    status: req.body.status
  }
  privilege.updateprivilege(priData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//delete privilege
router.post('/deleteprivilege', function (req, res, next) {
  var priData = {
    privilege_id: req.body.privilege_id
  }
  privilege.deleteprivilege(priData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get privilege x id
router.post('/getdataprivilege', function (req, res, next) {
  var priData = {
    privilege_id: req.body.privilege_id
  }
  privilege.dataprivilege(priData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all privilege 
router.get('/getdataprivileges', function (req, res, next) {
  var priData = {}
  privilege.dataAllprivilege(priData, function (error, data) {
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