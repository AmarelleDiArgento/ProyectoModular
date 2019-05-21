var mysql = require('mysql'),
  config = require("../config");

var connection = mysql.createConnection(config.db);

connection.connect();

var saleModel = {}

saleModel.createSale = function (saleData, callback) {
  
  var query = 'insert into sale (date, pod_id, user_id, client_id) values ("' + saleData.date + '",' + saleData.pod_id + ',"' + saleData.user_id + '", "' + saleData.client_id + '");';
  
  if (connection) {

    connection.query(query, function (error, rows) {
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


saleModel.updateSale = function (saleData, callback) {
  var query = "UPDATE sale SET   date = '" + saleData.date + "', pod_id = " + saleData.pod_id + ", user_id = '" + saleData.user_id + "', client_id= " + saleData.client_id + "    where sale_id='" + saleData.sale_id + "' ";
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


saleModel.deleteSale = function (saleData, callback) {
  var query = "DELETE  from sale where sale_id=" + saleData.sale_id + " ";
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


saleModel.dataSale = function (saleData, callback) {
  var query = "SELECT sale_id, date, pod_id, user_id, client_id from sale where sale_id= '" + saleData.sale_id + "' ";
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

saleModel.dataAllSale = function (saleData, callback) {
  var query = "SELECT sale_id, date, pod_id, user_id, client_id from sale ";
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


module.exports = saleModel;