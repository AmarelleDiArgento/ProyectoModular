var mysql = require('mysql'),
  config = require("../config");
  var enigma = require('enigma-code')
  
  const valorEncriptación = 8
  let key = '3456#@|#lM'

//init pool mysql
var connection = mysql.createPool(config.db);

var saleModel = {}

let ins = `call proyectomodular.saleins(?,?,?,?,?,?);`;
let acc = `call proyectomodular.saleupdacco(?,?,?);`;
let del = ``;
let all = `call proyectomodular.saleall();`;
let bet = `call proyectomodular.saledate(?,?);`;
let one = `call proyectomodular.saleone(?);`;
let sum = `call proyectomodular.sale_productDay(?,?);`;

saleModel.createSale = function (saleData, callback) {
  if (connection) {
    connection.query(ins, [
      saleData.pod_id,
      saleData.user_id,
      saleData.client_id,
      saleData.cardpayment,
      saleData.authorization,
      saleData.list_product
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


saleModel.updateSale = function (saleData, callback) {
  console.log('Llegue al modulo')
  let pass;
  enigma.genHash(valorEncriptación, key, saleData.password, function (error, hash) {
    if (error) return console.error(error.error)
    pass = hash
  })
  if (connection) {
    connection.query(acc, [
      saleData.sale_id,
      saleData.user_id,
      pass
    ], function (error, rows) {
      console.log(saleData);
      
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        console.log(rows);
        if (rows.length != 0) {

          if (rows[0] != null) {

            var string = JSON.stringify(rows[0]);
            rows = JSON.parse(string);
            rows = rows[0].message;
            var jsonObj = {
              respuesta: rows
            }
          } else {
            rows = rows[0];
            var jsonObj = {
              rows,
              respuesta: "Success"
            }

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
  if (connection) {
    connection.query(one, saleData.sale_id, function (error, rows) {
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

saleModel.dataSaleBet = function (saleData, callback) {
  if (connection) {
    connection.query(bet, [
      saleData.since,
      saleData.until
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

saleModel.dataSaleBetSum = function (saleData, callback) {
  if (connection) {
    connection.query(sum, [
      saleData.since,
      saleData.until
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


saleModel.dataAllSale = function (saleData, callback) {
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


module.exports = saleModel;