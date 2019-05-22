var mysql = require('mysql'),
  config = require("../config");
var enigma = require('enigma-code')

const valorEncriptación = 8
let key = '3456#@|#lM'

var connection = mysql.createConnection(config.db);

connection.connect();

var loginModel = {}

let login = `call proyectomodular.userlogin(?,?);`;

loginModel.getUserLogin = function (userData, callback) {

  var pass;
  enigma.genHash(valorEncriptación, key, userData.password, function (error, hash) {
    if (error) return console.error(error)
    pass = hash
  })

  if (connection) {
    connection.query(login, [
      userData.email,
      pass
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
            rows,
            respuesta: "Success"
          }
          callback(null, jsonObj)
        } else {
          console.log("Error la consulta no arroja datos")
          callback(null, {
            "respuesta": "Usuario y/o contraseña no son validos"
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


module.exports = loginModel;