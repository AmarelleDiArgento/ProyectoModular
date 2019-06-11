var mysql = require('mysql'),
  config = require("../config");
var enigma = require('enigma-code')

const valorEncriptación = 8
let key = '3456#@|#lM'

//init pool mysql
var connection = mysql.createPool(config.db);

var userModel = {}

let ins = `call proyectomodular.userins(?,?,?,?,?,?);`;
let cli = `call proyectomodular.usercliins(?,?,?);`;
let upd = `call proyectomodular.userupd(?,?,?,?,?,?);`;
let del = `call proyectomodular.userdel(?);`;
let all = `call proyectomodular.userall();`;
let one = `call proyectomodular.userone(?);`;

userModel.createUser = function (userData, callback) {
  var pass;
  enigma.genHash(valorEncriptación, key, userData.password, function (error, hash) {
    if (error) return console.error(error)
    pass = hash
  })

  if (connection) {
    connection.query(ins, [
      userData.user_id,
      userData.username,
      userData.email,
      pass,
      userData.rol_id,
      userData.status
    ], function (error, rows) {
      if (error) {
        callback(null, {
          "respuesta": error.message
        })
        console.log(error.message);

      } else {
        if (rows.length != 0) {
          rows = rows[0];
          var jsonObj = {
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error no se pudo insertar")
          callback(null, {
            "respuesta": "Error no se pudo insertar"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}
userModel.createClient = function (userData, callback) {

  if (connection) {
    connection.query(cli, [
      userData.user_id,
      userData.username,
      userData.email
    ], function (error, rows) {
      if (error) {
        callback(null, {
          "respuesta": error.message
        })
        console.log(error.message);

      } else {
        if (rows.length != 0) {
          rows = rows[0];
          var jsonObj = {
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error no se pudo insertar")
          callback(null, {
            "respuesta": "Error no se pudo insertar"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}
userModel.updateUser = function (userData, callback) {
  var pass;
  enigma.genHash(valorEncriptación, key, userData.password, function (error, hash) {
    if (error) return console.error(error)
    pass = hash
  })

  if (connection) {
    connection.query(upd, [
      userData.user_id,
      userData.username,
      userData.email,
      pass,
      userData.rol_id,
      userData.status
    ], function (error, rows) {
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          rows = rows[0];
          var jsonObj = {
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error")
          callback(null, {
            "respuesta": "Error al actualizar"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}

userModel.deleteUser = function (userData, callback) {
  if (connection) {
    connection.query(del, userData.user_id, function (error, rows) {
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          rows = rows[0];
          var jsonObj = {
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error")
          callback(null, {
            "respuesta": "Error al eliminar"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}

userModel.dataUser = function (userData, callback) {
  if (connection) {
    connection.query(one, userData.user_id, function (error, rows) {
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          rows = rows[0];
          var jsonObj = {
            rows,
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error la consulta no arroja datos")
          callback(null, {
            "respuesta": "Error la consulta no arroja datos"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}

userModel.dataAllUser = function (userData, callback) {
  if (connection) {
    connection.query(all, function (error, rows) {
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          rows = rows[0];
          var jsonObj = {
            rows,
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error la consulta no arroja datos")
          callback(null, {
            "respuesta": "Error no hay datos"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}

userModel.dataAllPodUser = function (userData, callback) {
  var query = "SELECT pod.pod_id, pod.name FROM pod_user INNER JOIN user ON pod_user.ps_user_id = user.user_id INNER JOIN pod ON pod_user.ps_pod_id = pod.pod_id where pod_user.ps_user_id="+userData.ps_user_id+" "
  if (connection) {
    connection.query(query, function (error, rows) {
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          var jsonObj = {
            rows,
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error la consulta no arroja datos")
          callback(null, {
            "respuesta": "Error no hay datos"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}

userModel.updatatePodUser = function (userData, callback) {
  var query = "UPDATE pod_user SET ps_user_id="+userData.ps_user_id+", ps_pod_id="+userData.ps_pod_id+" WHERE ps_user_id="+userData.ps_user_id+", ps_pod_id="+userData.ps_pod_id+" "
  if (connection) {
    connection.query(query, function (error, rows) {
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          var jsonObj = {
            rows,
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error al actualizar")
          callback(null, {
            "respuesta": "Error al actualizar"
          })
        }
      }
    })
  } else {
    console.log("No se conecto con servidor")
    callback(null, {
      "Respuesta": "Error en Conexion"
    })
  }
}

module.exports = userModel;