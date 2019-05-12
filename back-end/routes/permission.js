var express = require('express');
var router = express.Router();
//data model permission
var permission = require('../Modules/permission')
// get data permission for role
router.post('/getdatapermission', function (req, res, next) {
  var permissionData = {
    rol: req.body.rol
  }
  permission.getPermission(permissionData, function (error, data) {
    if (error) {
      res.status(501).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

module.exports = router;