var mysql = require('mysql'),
    config = require("../config");


//init pool mysql
var connection = mysql.createPool(config.db);

var productModel = {}


let ins = `call proyectomodular.productins(?, ?, ?, ?, ?, ?);`;
let upd = `call proyectomodular.productupd(?,?, ?, ?, ?, ?, ?);`;
let del = `call proyectomodular.productdel(?);`;
let all = `call proyectomodular.productall();`;
let one = `call proyectomodular.productone(?);`;

productModel.createproduct = function (prodData, callback) {

    if (connection) {
        connection.query(ins,
            [
                prodData.code,
                prodData.name,
                prodData.net_price,
                prodData.category_id,
                prodData.tax_id,
                prodData.status
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


productModel.updateproduct = function (prodData, callback) {
    if (connection) {
        connection.query(upd,
            [
                prodData.product_id,
                prodData.code,
                prodData.name,
                prodData.net_price,
                prodData.category_id,
                prodData.tax_id,
                prodData.status
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

productModel.deleteproduct = function (prodData, callback) {
    if (connection) {
        connection.query(del, prodData.product_id, function (error, rows) {
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

productModel.dataproduct = function (prodData, callback) {
    if (connection) {
        connection.query(one, prodData.product_id, function (error, rows) {
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

productModel.dataAllproduct = function (prodData, callback) {
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

module.exports = productModel;