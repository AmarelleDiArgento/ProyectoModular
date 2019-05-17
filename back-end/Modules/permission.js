var mysql = require('mysql'),
config = require("../config");

var connection = mysql.createConnection(config.db);

connection.connect();

var permissionModel = {}

permissionModel.getPermission = function (permissionData, callback) {

    var query = `SELECT rp.rp_privilege_id,rp.rp_rol_id,rp.view,rp.create,rp.update,
    rp.delete,pv.name as privilege_name,pv.module_id,pv.icon,pv.route,
    pv.status as status_privilege,md.name as module_name, md.status as status_module 
    FROM rol_privilege rp 
    INNER JOIN  privilege pv ON rp.rp_privilege_id = pv.privilege_id 
    INNER JOIN  module md ON md.module_id = pv.module_id  
    WHERE rp.rp_rol_id  = ` + permissionData.rol + `;`
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


module.exports = permissionModel;