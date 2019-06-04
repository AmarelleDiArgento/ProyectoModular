var mysql = require('mysql'),
    config = require("../config");


//init pool mysql
var connection = mysql.createPool(config.db);

var moduloModel = {}


let ins = `call proyectomodular.moduleins(?,?);`;
let upd = `call proyectomodular.moduleupd(?,?,?);`;
let del = `call proyectomodular.moduledel(?);`;
let all = `call proyectomodular.moduleall();`;
let one = `call proyectomodular.moduleone(?);`;

moduloModel.createmodulo = function (moduloData, callback) {

    if (connection) {
        connection.query(ins, [
            moduloData.name,
            moduloData.status
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


moduloModel.updatemodulo = function (moduloData, callback) {
    if (connection) {
        connection.query(upd,
            [
                moduloData.modulo_id,
                moduloData.name,
                moduloData.state
            ],
            function (error, rows) {
                if (error) {
                    console.log(error)
                    callback(null, {
                        "respuesta": "Error de conexión"
                    })
                } else {
                    if (rows.length != 0) {
                        rows = rows[0];
                        console.log('Cosa; ' + rows);
                        
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

moduloModel.deletemodulo = function (moduloData, callback) {
    if (connection) {
        connection.query(del, moduloData.modulo_id, function (error, rows) {
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

moduloModel.datamodulo = function (moduloData, callback) {
    if (connection) {
        connection.query(one, moduloData.modulo_id, function (error, rows) {
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

moduloModel.dataAllmodulo = function (moduloData, callback) {
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

module.exports = moduloModel;