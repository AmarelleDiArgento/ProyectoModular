var express = require('express');
var router = express.Router();

var poduser = require('../Modules/poduser')


//create poduser
router.post('/createpoduser', function (req, res, next) {
  var podData = {
    ps_user_id: req.body.ps_user_id,
    ps_pod_id: req.body.ps_pod_id
  }
  poduser.createPodUser(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//update poduser
router.post('/updatepoduser', function (req, res, next) {
  var podData = {
    ps_user_id: req.body.ps_user_id,
    ps_pod_id: req.body.ps_pod_id
  }
  poduser.updatePodUser(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//delete poduser
router.post('/deletepoduser', function (req, res, next) {
  var podData = {
    ps_user_id: req.body.ps_user_id
  }
  poduser.deletePodUser(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//get poduser x id
router.post('/getdatapoduser', function (req, res, next) {
    var podData = {
        ps_user_id: req.body.ps_user_id
      }
      poduser.dataPodUser(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all poduser 
router.get('/getdatapoduser', function (req, res, next) {
    var podData = {}
    poduser.dataAllPodUser(podData, function (error, data) {
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