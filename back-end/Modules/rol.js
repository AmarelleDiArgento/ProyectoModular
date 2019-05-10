var mysql = require('mysql')
var enigma = require('enigma-code')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Arkangel",
    database: "proyectoModular"
  })

  connection.connect();

  var rolModel = {}

  rolModel.createrol = function (rolData, callback) {
  
    var query = 'insert into rol (name) values ("' + rolData.name + '");';
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

  
module.exports = rolModel;