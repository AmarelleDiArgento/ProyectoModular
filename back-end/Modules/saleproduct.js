var mysql = require('mysql'),
  config = require("../config");

//init pool mysql
var connection = mysql.createPool(config.db);

var saleProductModel = {}
let ins = `call proyectomodular.sale_productins(?,?,?);`;
let upd = `call proyectomodular.sale_productup(?,?,?);`;
let del = `call proyectomodular.sale_productdel(?,?)`;
let all = `call proyectomodular.sale_productall();`;
let one = `call proyectomodular.sale_productall(?);`;

saleProductModel.createSaleProduct = function (saleData, callback) {

  if (connection) {
    connection.query(ins,[
      saleData.sale_id,
      saleData.product_id,
      saleData.quantity
    ], function (error, rows) {
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


saleProductModel.updateSaleProduct = function (saleData, callback) {
  var query = "UPDATE sale_product SET   sp_sale_sale_id = " + saleData.sp_sale_sale_id + ", quantity = " + saleData.quantity + "  where sp_product_id='" + saleData.sp_product_id + "' ";
  if (connection) {
    connection.query(query, function (error, rows) {
      console.log(rows);
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


saleProductModel.deleteSaleProduct = function (saleData, callback) {
  var query = "DELETE  from sale_product where sp_product_id=" + saleData.sp_product_id + " ";
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


saleProductModel.dataSaleProduct = function (saleData, callback) {
  var query = "SELECT sp_product_id, sp_sale_sale_id, quantity from sale_product where sp_product_id= '" + saleData.sp_product_id + "' ";
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

saleProductModel.dataAllSale = function (saleData, callback) {
  var query = "SELECT sp_product_id, sp_sale_sale_id, quantity from sale_product ";
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


module.exports = saleProductModel;