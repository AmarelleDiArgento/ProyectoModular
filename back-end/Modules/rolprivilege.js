var mysql = require('mysql'),
    config = require("../config");


var connection = mysql.createConnection(config.db);

connection.connect();

var rolModel = {}


let ins = `call proyectomodular.rol_privilegeins(?,?,?,?,?,?,?);`;
let upd = `call proyectomodular.rol_privilegeupd(?,?,?,?,?,?,?);`;
let del = `call proyectomodular.rol_privilegedel(?,?);`;
let all = `call proyectomodular.rol_privilegeall(?);`;
let one = `call proyectomodular.rol_privilegeone(?,?);`;

rolModel.createrol = function (rolData, callback) {

    if (connection) {
        connection.query(ins, [
            rolData.rp_privilege_id,
            rolData.rp_rol_id,
            rolData.view,
            rolData.create,
            rolData.update,
            rolData.delete
        ], function (error, rows) {
            if (error) {
                callback(null, {
                    "respuesta": error
                })
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


rolModel.updateRol = function (rolData, callback) {
    if (connection) {
        connection.query(upd,
            [
                rolData.rp_privilege_id,
                rolData.rp_rol_id,
                rolData.view,
                rolData.create,
                rolData.update,
                rolData.delete
            ],
            function (error, rows) {
                console.log(rows);
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

rolModel.deleteRol = function (rolData, callback) {
    if (connection) {
        connection.query(del, [
            rolData.rp_privilege_id,
            rolData.rp_rol_id
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

rolModel.dataRol = function (rolData, callback) {
    if (connection) {
        connection.query(one, [
            rolData.rp_privilege_id,
            rolData.rp_rol_id
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

rolModel.dataAllRol = function (rolData, callback) {
    if (connection) {
        console.log(rolData.rp_rol_id);
        
        connection.query(all, rolData.rp_rol_id, function (error, rows) {
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

module.exports = rolModel;