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
      res.status(200).jsonp(data.rows[0])
    }
  })
})

//update category
router.put('/updatecategory', function (req, res, next) {
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
      res.status(200).jsonp(data.rows[0])
    }
  })
})

//delete category
router.delete('/deletecategory', function (req, res, next) {
  var catData = {
    category_id: req.body.category_id
  }
  category.deletecategory(catData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data.rows[0])
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
      res.status(200).jsonp(data.rows[0])
    }
  })
})

//get all category 
router.get('/getdatacategorys', function (req, res, next) {
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
