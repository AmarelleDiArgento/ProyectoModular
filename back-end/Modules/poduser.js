var mysql = require('mysql'),
  config = require("../config");

//init pool mysql
var connection = mysql.createPool(config.db);

var podUserModel = {}

let ins = `call proyectomodular.pod_userins(?,?);`;
let upd = `call proyectomodular.pod_userupd(?,?);`;
let del = `call proyectomodular.pod_userdel(?);`;
let all = `call proyectomodular.pod_userins(?);`;
let one = `call proyectomodular.pod_userins(?,?);`;

podUserModel.createPodUser = function (podData, callback) {
  if (connection) {
    connection.query(ins, [
      podData.ps_user_id,
      podData.ps_pod_id
    ], function (error, rows) {
      console.log('mod:',
        podData.ps_user_id,
        podData.ps_pod_id);

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


podUserModel.updatePodUser = function (podData, callback) {
  if (connection) {
    connection.query(upd, [
      podData.ps_user_id,
      podData.ps_pod_id
    ], function (error, rows) {
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


podUserModel.deletePodUser = function (podData, callback) {
  if (connection) {
    connection.query(del, [
      podData.ps_user_id
    ], function (error, rows) {
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


podUserModel.dataPodUser = function (podData, callback) {
  if (connection) {
    connection.query(one, [
      podData.ps_user_id,
      podData.ps_pod_id
    ], function (error, rows) {
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

podUserModel.dataAllPodUser = function (saleData, callback) {
  if (connection) {
    connection.query(all, [
      podData.ps_user_id
    ], function (error, rows) {
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


module.exports = podUserModel;