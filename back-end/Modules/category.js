var mysql = require('mysql'),
    config = require("../config");


var connection = mysql.createConnection(config.db);

connection.connect();

var categoryModel = {}


let ins = `call proyectomodular.categoryins(?);`;
let upd = `call proyectomodular.categoryupd(?,?);`;
let del = `call proyectomodular.categorydel(?);`;
let all = `call proyectomodular.categoryall();`;
let one = `call proyectomodular.categoryone(?);`;

categoryModel.createcategory = function (catDate, callback) {

    if (connection) {
        connection.query(ins, catDate.name, function (error, rows) {
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


categoryModel.updatecategory = function (catDate, callback) {
    if (connection) {
        connection.query(upd,
            [
                catDate.category_id,
                catDate.name
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

categoryModel.deletecategory = function (catDate, callback) {
    if (connection) {
        connection.query(del, catDate.category_id, function (error, rows) {
            if (error) {
                console.log(error)
                callback(null, {
                    "respuesta": "Error de conexión"
                })
            } else {
                if (rows.length != 0) {
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

categoryModel.datacategory = function (catDate, callback) {
    if (connection) {
        connection.query(one, catDate.category_id, function (error, rows) {
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

categoryModel.dataAllcategory = function (catDate, callback) {
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

module.exports = categoryModel;