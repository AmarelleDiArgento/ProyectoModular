var express = require('express');
var router = express.Router();
//model
var sale = require('../Modules/sale')

//create sale
router.post('/createsale', function (req, res, next) {
    var saleData = {
        date: req.body.date,
        pod_id: req.body.pod_id,
        user_id: req.body.user_id,
        cliente_id: req.body.cliente_id
    }
    sale.createSale(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})
//update sale
router.post('/updatesale', function (req, res, next) {
    var saleData = {
        sale_id: req.body.sale_id,
        date: req.body.date,
        pod_id: req.body.pod_id,
        user_id: req.body.user_id,
        cliente_id: req.body.cliente_id
    }
    sale.updateSale(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})
//delete sale
router.post('/deletesale', function (req, res, next) {
    var saleData = {
        sale_id: req.body.sale_id
    }
    sale.deleteSale(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})
//get sale x id
router.post('/getdatasale', function (req, res, next) {
    var saleData = {
        sale_id: req.body.sale_id
    }
    sale.dataSale(saleData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})

//get all sale 
router.get('/getdatasale', function (req, res, next) {
    var saleData = {}
    sale.dataAllSale(saleData, function (error, data) {
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