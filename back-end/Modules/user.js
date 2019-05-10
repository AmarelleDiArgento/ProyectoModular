var mysql = require('mysql')
var enigma = require('enigma-code')

const valorEncriptación = 8
let key = '3456#@|#lM'

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Arkangel",
  database: "proyectoModular"
})

connection.connect();

var userModel = {}

userModel.createUser = function (userData, callback) {
  var pass;
  enigma.genHash(valorEncriptación, key, userData.password, function (error, hash) {
    if (error) return console.error(error)
    pass = hash
  })

  var query = 'insert into user (user_id, username, email, password, rol_id, status) values ("' + userData.user_id + '","' + userData.username + '","' + userData.email + '", "' + pass + '", ' + userData.rol_id + ', "' + userData.status + '");';
  if (connection) {
    connection.query(query, function (error, rows) {
      if (error) {
        callback(null, {
          "respuesta": error
        })
      } else {
        if (rows.length != 0) {
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
  var query = "UPDATE user SET   user_id = '" + userData.user_id + "', username = '" + userData.username + "', email = '" + userData.email + "', password = '" + pass + "', rol_id= " + userData.rol_id + " , status = '" + userData.status + "' , update_time = CURRENT_TIMESTAMP   where user_id='" + userData.user_id + "' ";
  if (connection) {
    connection.query(query, function (error, rows) {
      console.log(rows);
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
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
  var query = "DELETE  from user where user_id=" + userData.user_id + " ";
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
  var query = "select user_id, username, email, rol_id, status, create_time, update_time from user where user_id= '" + userData.user_id + "' ";
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
  var query = "select user_id, username, email, rol_id, status, create_time, update_time from user ";
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


module.exports = userModel;