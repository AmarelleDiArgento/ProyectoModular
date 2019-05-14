var express = require('express');
var router = express.Router();

var pod = require('../Modules/pod')


//create pod
router.post('/createpod', function (req, res, next) {
  var podData = {
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    status: req.body.status
  }
  pod.createPod(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//update pod
router.post('/updatepod', function (req, res, next) {
  var podData = {
    pod_id: req.body.pod_id,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    status: req.body.status
  }
  pod.updatePod(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//delete pod
router.post('/deletepod', function (req, res, next) {
  var podData = {
    pod_id: req.body.pod_id
  }
  pod.deletePod(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//get pod x id
router.post('/getdatapod', function (req, res, next) {
    var podData = {
        pod_id: req.body.pod_id
      }
      pod.dataPod(podData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all pod 
router.get('/getdatapod', function (req, res, next) {
    var podData = {}
    pod.dataAllPod(podData, function (error, data) {
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