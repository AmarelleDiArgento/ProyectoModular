var express = require('express');
var router = express.Router();

var user = require('../Modules/user')


//create user
router.post('/createuser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    rol_id: req.body.rol_id,
    status: req.body.status
  }
  user.createUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//create client
router.post('/createclient', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email
  }
  user.createClient(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//assingn user pod
router.post('/assignuserpod', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id,
    pod_id: req.body.pod_id
  }
  user.assignUserPod(userData, function (error, data) {
    if (error) {
      console.log(error);

      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//update user
router.post('/updateuser', function (req, res, next) {
  var userData = {
    old_id: req.body.old_id,
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email,
    rol_id: req.body.rol_id,
    status: req.body.status
  }
  user.updateUser(userData, function (error, data) {
    console.log(userData);
    
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update user pasword
router.post('/updateuserpassword', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id,
    password_old: req.body.password_old,
    password_new: req.body.password_new
  }
  user.updateUserPassword(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update user pasword
router.post('/resetuserpassword', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id,
    password: req.body.password
  }

  user.resetUserPassword(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})


//delete user
router.post('/deleteuser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id
  }
  user.deleteUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//delete pod assign user
router.post('/resetuserpod', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id
  }
  user.podUserReset(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//get user x id
router.post('/getdatauser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id
  }
  user.dataUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//get pod user
router.post('/getdatapoduser', function (req, res, next) {
  var userData = {
    user_id: req.body.user_id
  }
  user.dataPodUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})
//get all user 
router.get('/getdatausers', function (req, res, next) {
  var userData = {}
  user.dataAllUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//get all pod user 
router.post('/getpoduser', function (req, res, next) {
  var userData = {
    ps_user_id: req.body.ps_user_id
  }
  user.dataAllPodUser(userData, function (error, data) {
    if (error) {
      res.status(504).jsonp({
        "error": error
      })
    } else {
      res.status(200).jsonp(data)
    }
  })
})

//update  pod user
router.post('/updatepoduser', function (req, res, next) {
  var userData = {
    ps_user_id: req.body.ps_user_id,
    ps_pod_id: req.body.ps_pod_id
  }
  user.updatatePodUser(userData, function (error, data) {
    
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