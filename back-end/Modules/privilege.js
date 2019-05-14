var mysql = require('mysql'),
    config = require("../config");


var connection = mysql.createConnection(config.db);

connection.connect();

var privilegeModel = {}


let ins = `call proyectomodular.privilegeins(?, ?, ?, ?, ?, ?);`;
let upd = `call proyectomodular.privilegeupd(?,?, ?, ?, ?, ?, ?);`;
let del = `call proyectomodular.privilegedel(?);`;
let all = `call proyectomodular.privilegeall();`;
let one = `call proyectomodular.privilegeone(?);`;

privilegeModel.createprivilege = function (privData, callback) {

    if (connection) {
        connection.query(ins,
            [
                privData.name,
                privData.module_id,
                privData.icon,
                privData.route,
                privData.status
            ],
            function (error, rows) {
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


privilegeModel.updateprivilege = function (privData, callback) {
    if (connection) {
        connection.query(upd,
            [
                privData.privilege_id,
                privData.name,
                privData.module_id,
                privData.icon,
                privData.route,
                privData.status
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

privilegeModel.deleteprivilege = function (privData, callback) {
    if (connection) {
        connection.query(del, privData.privilege_id, function (error, rows) {
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

privilegeModel.dataprivilege = function (privData, callback) {
    if (connection) {
        connection.query(one, privData.privilege_id, function (error, rows) {
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

privilegeModel.dataAllprivilege = function (privData, callback) {
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

module.exports = privilegeModel;