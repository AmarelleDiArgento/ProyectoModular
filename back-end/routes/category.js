var express = require('express');
var router = express.Router();

var category = require('../Modules/category')


//create category
router.post('/createcategory', function (req, res, next) {
  var catData = {
    name: req.body.name
  }
  category.createcategory(catData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update category
router.post('/updatecategory', function (req, res, next) {
  var catData = {
    category_id: req.body.category_id,
    name: req.body.name
  }
  category.updatecategory(catData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//delete category
router.post('/deletecategory', function (req, res, next) {
  var catData = {
    category_id: req.body.category_id
  }
  category.deletecategory(catData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get category x id
router.post('/getdatacategory', function (req, res, next) {
  var catData = {
    category_id: req.body.category_id
  }
  category.datacategory(catData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all category 
router.get('/getdatacategory', function (req, res, next) {
  var catData = {}
  category.dataAllcategory(catData, function (error, data) {
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
