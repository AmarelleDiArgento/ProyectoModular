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
let insprodtax = `call proyectomodular.producttaxsins(?,?);`;

productModel.createproduct = function (prodData, callback) {

    if (connection) {
        connection.query(ins,
            [
                prodData.code,
                prodData.name,
                prodData.net_price,
                prodData.category_id,
                prodData.image,
                prodData.status

            ],
            function (error, rows) {
                console.log(prodData);

                if (error) {
                    console.log(error);

                    callback(null, {
                        "respuesta": error
                    })
                } else {
                    if (rows.length != 0) {
                        console.log(rows);
                        
                        rows = rows[0];

                        var jsonObj = {
                            rows,
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
                prodData.image,
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

productModel.dataAllProductTax = function (prodData, callback) {
    var query = "SELECT tax.tax_id, tax.name FROM product_tax INNER JOIN product ON product_tax.pt_product_id = product.product_id INNER JOIN tax ON product_tax.pt_tax_id = tax.tax_id where product.product_id=" + prodData.pt_product_id + " "
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

productModel.updateProductTax = function (prodData, callback) {

    if (connection) {
        connection.query(insprodtax,
            [
                prodData.pt_product_id,
                prodData.pt_tax_id
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
                        var jsonObj = {
                            rows,
                            respuesta: "Success"
                        }
                        callback(null, jsonObj)
                    } else {
                        console.log("Error al actualizar")
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

module.exports = productModel;