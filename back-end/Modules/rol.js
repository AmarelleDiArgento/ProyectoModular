var mysql = require('mysql')
var enigma = require('enigma-code')

var connection = mysql.createConnection({
  host: "localhost",
  user: "proyectomodular",
  password: "da12cb09fe566f2d6e131d7fb5c5c732",
  database: "proyectomodular"
})

connection.connect();

var rolModel = {}


let ins = `call proyectoModular.rolins(?);`;
let upd = `call proyectoModular.rolupd(?,?);`;
let del = `call proyectoModular.roldel(?);`;
let all = `call proyectoModular.rolall();`;
let one = `call proyectoModular.rolone(?);`;

rolModel.createrol = function (rolData, callback) {

  if (connection) {
    connection.query(ins, rolData.name, function (error, rows) {
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