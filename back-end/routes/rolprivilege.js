var express = require('express');
var router = express.Router();

var rol = require('../Modules/rolprivilege')


//create rol
router.post('/createrolprivilege', function (req, res, next) {
    var rolData = {
        rp_privilege_id: req.body.rp_privilege_id,
        rp_rol_id: req.body.rp_rol_id,
        view: req.body.view,
        create: req.body.create,
        update: req.body.update,
        delete: req.body.delete
    }
    rol.createrol(rolData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})

//update rol
router.post('/updaterolprivilege', function (req, res, next) {
    var rolData = {
        rp_privilege_id: req.body.rp_privilege_id,
        rp_rol_id: req.body.rp_rol_id,
        view: req.body.view,
        create: req.body.create,
        update: req.body.update,
        delete: req.body.delete
    }
    rol.updateRol(rolData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})

//delete rol
router.post('/deleterolprivilege', function (req, res, next) {
    var rolData = {
        rp_privilege_id: req.body.rp_privilege_id,
        rp_rol_id: req.body.rp_rol_id
    }
    rol.deleteRol(rolData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})

//get rol x id
router.post('/getdatarolprivilege', function (req, res, next) {
    var rolData = {
        rp_privilege_id: req.body.rp_privilege_id,
        rp_rol_id: req.body.rp_rol_id
    }
    rol.dataRol(rolData, function (error, data) {
        if (error) {
            res.status(504).jsonp({
                "error": error
            })
        } else {
            res.status(200).jsonp(data)
        }
    })
})

//get all rol 
router.post('/getdatarolprivileges', function (req, res, next) {
    var rolData = {
        rp_rol_id: req.body.rp_rol_id
    }
    rol.dataAllRol(rolData, function (error, data) {
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