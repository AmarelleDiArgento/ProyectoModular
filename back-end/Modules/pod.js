var mysql = require('mysql'),
  config = require("../config");

//init pool mysql
var connection = mysql.createPool(config.db);

var podModel = {}

let ins = `call proyectomodular.podins(?, ?, ?, ?, ?, ?, ?, ?, ? );`;
let upd = `call proyectomodular.podupd(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
let del = `call proyectomodular.poddel(?);`;
let all = `call proyectomodular.podall();`;
let one = `call proyectomodular.podone(?);`;


podModel.createPod = function (podData, callback) {
  if (connection) {
    connection.query(ins, [
      podData.code,
      podData.nit,
      podData.rdian,
      podData.daterdian,
      podData.billing_limit,
      podData.name,
      podData.address,
      podData.phone,
      podData.status
    ], function (error, rows) {
      if (error) {
        // console.log(error);
        
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


podModel.updatePod = function (podData, callback) {
  if (connection) {
    connection.query(upd, [
      podData.pod_id,
      podData.code,
      podData.nit,
      podData.rdian,
      podData.daterdian,
      podData.billing_limit,
      podData.name,
      podData.address,
      podData.phone,
      podData.status
    ], function (error, rows) {
      if (error) {
        // console.log(error);
        
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
          //console.log("Error")
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


podModel.deletePod = function (podData, callback) {
  if (connection) {
    connection.query(del, podData.pod_id, function (error, rows) {
      if (error) {
        //console.log(error)
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


podModel.dataPod = function (podData, callback) {
  if (connection) {
    connection.query(one, podData.pod_id, function (error, rows) {
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

podModel.dataAllPod = function (saleData, callback) {
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


module.exports = podModel;