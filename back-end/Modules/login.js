var mysql = require('mysql')

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "proyectomodular"
})

connection.connect();

var loginModel = {}

loginModel.getUserLogin = function (userData, callback) {

  var query = "select user_id, username, rol_id, status  from user where email = '" + userData.email + "' and password = '" + userData.password + "' "
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