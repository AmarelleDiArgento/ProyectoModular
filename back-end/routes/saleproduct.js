var express = require('express');
var router = express.Router();
//model
var saleproduct = require('../Modules/saleproduct')

//create saleproduct
router.post('/createsaleproduct', function (req, res, next) {
    var saleData = {
        sale_id: req.body.sale_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    saleproduct.createSaleProduct(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})
//update saleproduct
router.post('/updatesaleproduct', function (req, res, next) {
    
    
    var saleData = {
        sale_id: req.body.sale_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    console.log(saleData);
    saleproduct.updateSaleProduct(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})
//delete saleproduct
router.post('/deletesaleproduct', function (req, res, next) {
    var saleData = {
        sp_product_id: req.body.sp_product_id
    }
    saleproduct.deleteSaleProduct(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})
//get saleproduct x id
router.post('/getdatasaleproduct', function (req, res, next) {
    var saleData = {
        sp_product_id: req.body.sp_product_id
    }
    saleproduct.dataSaleProduct(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})

//get all saleproduct 
router.get('/getdatasaleproduct', function (req, res, next) {
    var saleData = {}
    saleproduct.dataAllSale(saleData, function (error, data) {
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