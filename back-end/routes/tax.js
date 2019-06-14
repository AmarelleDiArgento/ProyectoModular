var express = require('express');
var router = express.Router();

var tax = require('../Modules/tax')


//create tax
router.post('/createtax', function (req, res, next) {
  var taxData = {
    name: req.body.name,
    percent: req.body.percent
  }
  tax.createtax(taxData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update tax
router.post('/updatetax', function (req, res, next) {
  var taxData = {
    tax_id: req.body.tax_id,
    name: req.body.name,
    percent: req.body.percent
  }
  tax.updatetax(taxData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//delete tax
router.post('/deletetax', function (req, res, next) {
  var taxData = {
    tax_id: req.body.tax_id
  }
  tax.deletetax(taxData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get tax x id
router.post('/getdatatax', function (req, res, next) {
  var taxData = {
    tax_id: req.body.tax_id
  }
  tax.datatax(taxData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all tax 
router.get('/getdatataxs', function (req, res, next) {
  var taxData = {}
  tax.dataAlltax(taxData, function (error, data) {
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
