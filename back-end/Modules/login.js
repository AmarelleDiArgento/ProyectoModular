var mysql = require('mysql')
var enigma = require('enigma-code')

const valorEncriptación = 8
let key = '3456#@|#lM'

var connection = mysql.createConnection({
  host: "localhost",
  user: "proyectomodular",
  password: "da12cb09fe566f2d6e131d7fb5c5c732",
  database: "proyectomodular"
})

connection.connect();

var loginModel = {}

loginModel.getUserLogin = function (userData, callback) {

  var pass;
  enigma.genHash(valorEncriptación, key, userData.password, function (error, hash) {
    if (error) return console.error(error)
    pass = hash
  })

  var query = "select user_id, username, rol_id, status  from user where email = '" + userData.email + "' and password = '" + pass + "' "
  //console.log(userData.email + 'pass: ' + pass);
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