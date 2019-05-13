var express = require('express');
var router = express.Router();

var product = require('../Modules/product')


//create product
router.post('/createproduct', function (req, res, next) {
  var productData = {
    code: req.body.code,
    name: req.body.name,
    net_price: req.body.net_price,
    category_id: req.body.category_id,
    tax_id: req.body.tax_id,
    status: req.body.status
  }
  product.createproduct(productData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update product
router.put('/updateproduct', function (req, res, next) {
  var productData = {
    product_id: req.body.product_id,
    code: req.body.code,
    name: req.body.name,
    net_price: req.body.net_price,
    category_id: req.body.category_id,
    tax_id: req.body.tax_id,
    status: req.body.status
  }
  product.updateproduct(productData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//delete product
router.delete('/deleteproduct', function (req, res, next) {
  var productData = {
    product_id: req.body.product_id
  }
  product.deleteproduct(productData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get product x id
router.post('/getdataproduct', function (req, res, next) {
  var productData = {
    product_id: req.body.product_id
  }
  product.dataproduct(productData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all product 
router.get('/getdataproducts', function (req, res, next) {
  var productData = {}
  product.dataAllproduct(productData, function (error, data) {
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
