var mysql = require('mysql'),
  config = require("../config");


var connection = mysql.createConnection(config.db);

connection.connect();

var taxModel = {}


let ins = `call proyectomodular.taxins(?,?);`;
let upd = `call proyectomodular.taxupd(?,?,?);`;
let del = `call proyectomodular.taxdel(?);`;
let all = `call proyectomodular.taxall();`;
let one = `call proyectomodular.taxone(?);`;

taxModel.createtax = function (taxData, callback) {

  if (connection) {
    connection.query(ins, [
      taxData.name,
      taxData.percent
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


taxModel.updatetax = function (taxData, callback) {
  if (connection) {
    connection.query(upd,
      [
        taxData.tax_id,
        taxData.name,
        taxData.percent
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

taxModel.deletetax = function (taxData, callback) {
  if (connection) {
    connection.query(del, taxData.tax_id, function (error, rows) {
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

taxModel.datatax = function (taxData, callback) {
  if (connection) {
    connection.query(one, taxData.tax_id, function (error, rows) {
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

taxModel.dataAlltax = function (taxData, callback) {
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

module.exports = taxModel;