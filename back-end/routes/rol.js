var express = require('express');
var router = express.Router();

var rol = require('../Modules/rol')


//create rol
router.post('/createrol', function (req, res, next) {
  var rolData = {
    name: req.body.name
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


module.exports = router;
