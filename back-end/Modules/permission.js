var mysql = require('mysql'),
config = require("../config");

var connection = mysql.createConnection(config.db);

connection.connect();

var permissionModel = {}

let permission = `call proyectomodular.rolpermissions(?);`;

permissionModel.getPermission = function (permissionData, callback) {

    if (connection) {
        connection.query(permission, [
            permissionData.rol
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


module.exports = permissionModel;