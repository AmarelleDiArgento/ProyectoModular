var mysql = require('mysql'),
config = require("../config");
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var express = require('express');
var router = express.Router();
//init pool mysql
var connection = mysql.createPool(config.db);

var saleModel = {}

let ins = `call proyectomodular.saleins(?,?,?,?,?,?,?);`;
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
      saleData.discount,
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


saleModel.dataSaleInvoice = function (saleData, callback) {
  let Encabezado, Productos, Impuestos, Totales, Error;

  var queries = [
    `Select p.pod_id as pv, code as prefijo, nit, rdian, daterdian, billing_limit, p.name as pod, 
    address, phone, s.sale_id, s.invoice_num, s.date, s.cardpayment, s.authorization, u.user_id as uId , u.username uName, 
    u.email as uEmail, s.client_id as cId , c.username cName, c.email as cEmail
    FROM pod as p
      inner join sale as s on p.pod_id = s.pod_id
      inner join user as u on s.user_id = u.user_id  
      inner join user as c on s.client_id = c.user_id 
    where sale_id = ${saleData.sale_id}`,
    `select p.product_id as id, p.name as producto, sp.quantity as cantidad, FORMAT(sp.net_price, 0) as precio
    from sale as s
    inner join sale_product as sp on s.sale_id = sp.sp_sale_id
    inner join product as p on sp.sp_product_id = p.product_id
    where s.sale_id = ${saleData.sale_id}`,
    `Select t.name as impuesto, t.percent as porcentaje , FORMAT(sum(sp.gross_price),2) as base,  
    FORMAT((sum(sp.gross_price) * t.percent)/100, 2) as val_impuesto
    from sale as s
    inner join sale_product as sp on s.sale_id = sp.sp_sale_id
    inner join product as p on sp.sp_product_id = p.product_id
    inner join product_tax as pt on p.product_id = pt.pt_product_id
    inner join tax as t on pt.pt_tax_id = t.tax_id
    where s.sale_id = ${saleData.sale_id}
    group by t.tax_id`,
    `SELECT FORMAT(sum(net_price),0) as Total
    FROM proyectomodular.sale_product
    where sp_sale_id = ${saleData.sale_id}`
  ];

    if (connection) {
      connection.query(queries.join(';'),  function (error, rows) {
        if (error) {
          console.log(error)
          callback(null, {
            "respuesta": "Error de conexión"
          })
        } else {
          if (rows.length != 0) { 

            Encabezado = rows[0]
            Productos = rows[1]
            Impuestos = rows[2]
            Totales = rows[3]

            var myHTML = ''; 
            myHTML += `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <!-- Compiled and minified CSS -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

                <!-- Compiled and minified JavaScript -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                        
                <title>Document</title>
            </head>
            <body>`
            myHTML +='<div class="row center">'+
              '<div class="row">'+
                '<div class="container">'+
                  '<img src="/logoprobocaitos.png" width="100%" height="auto" alt="">'+
                '</div>'+
                '<div id="bill" class="center">'+
                  JSON.stringify(Encabezado[0].pod) +'<br>'+
                  'NIT: '+JSON.stringify(Encabezado[0].nit)+ '  TEL'+ JSON.stringify(Encabezado[0].phone)+ '<br>'+
                  'REGIMEN COMÚN <br>'+
                  JSON.stringify(Encabezado[0].address)+ '<br>'+
                  '<br>'+
            
                  '<div class="row left-align" style="height: 35px; margin: 0%">'+
                    '<div class="col s12 center">FACTURA DE VENTAS</div>'+
                    '<div class="col s12 center">'+JSON.stringify(Encabezado[0].prefijo)+ '-' +JSON.stringify(Encabezado[0].invoice_num)+'</div>'+
                  '</div>'+
                  '<br>'+
                  '<div class="container">'+
                    '<div class="row">'+
                      '<div class="col s6">'+
                      '</div>'+
                      '<div class="col s6">'+
                        'Fecha:'+
                        JSON.stringify(Encabezado[0].date)+ '<br>'+
                      '</div>'+
                    '</div>'+
                    '<div class="row">'+
                      'Vendedor:'+ JSON.stringify(Encabezado[0].uName)+'<br>'+
                      'Cliente:'+ JSON.stringify(Encabezado[0].cName) +'<br>'+
                      'Forma de pago:'+ JSON.stringify(Encabezado[0].cardpayment)+'<br>'+
                    '</div>'+
                    '<div class="row" style="">'+
                      '<div class="col s2">Item</div>'+
                      '<div class="col s2">Cant.</div>'+
                      '<div class="col s5">Descripcion</div>'+
                      '<div class="col s3">Total</div>'+
                    "</div>";
                    for (var p= 0; p < Productos.length; p++) {
                      myHTML +='<div class="col s2">'+ JSON.stringify(Productos[p].id)+ '</div>'+
                      '<div class="col s2 center-align">'+ JSON.stringify(Productos[p].cantidad)+'</div>'+
                      '<div class="col s5">'+JSON.stringify(Productos[p].producto)+'</div>'+
                      '<div class="col s3 right-align">$ '+JSON.stringify(Productos[p].precio)+'</div>';
                  }

                  myHTML +='<div class="row left-align" style="">'+
                    '<div class="col s9">TOTAL</div>'+
                    '<div class="col s3 right-align">$ '+JSON.stringify(Totales[0].Total)+'</div>'+
                  '</div>'+

                  '<div class="row" style="">'+
                      '<div class="col s12 center">INFORMACION TRIBUTARIA '+
                      '</div>'+
                      '<div>'+
                        '<div class="col s3">Tipo</div>'+
                        '<div class="col s1">%</div>'+
                        '<div class="col s4">VLR BASE</div>'+
                        '<div class="col s4">VLR IMP</div>'+
                      '</div>';

                      for (var i= 0; i < Impuestos.length; i++) {
                        myHTML +='<div class="col s3">'+JSON.stringify(Impuestos[i].impuesto) +'</div>'+
                        '<div class="col s1">'+JSON.stringify(Impuestos[i].porcentaje)+ '%</div>'+
                        '<div class="col s4 ">$'+ JSON.stringify(Impuestos[i].base) +'</div>'+
                        '<div class="col s4 ">$'+ JSON.stringify(Impuestos[i].val_impuesto) +'</div>';
                      }

                     myHTML +='</div>'+

                     '<div class="row left-align" style="">'+
                        '<div class="col s12 center">R DIAN: '+Encabezado[0].rdian+'</div>'+
                        '<div class="col s12 center">FECHA '+Encabezado[0].daterdian+'</div>'+
                        '<div class="col s12 center">RANGO 0 A '+Encabezado[0].billing_limit +'</div>'+
                      '</div>'+

                      '<div class="col s12 cente-align" style="">'+
                        '<h5>'+
                          'GRACIAS POR SU COMPRA'+
                        '</h5>'+
                      '</div>'+
                    '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';


          var transporter = nodemailer.createTransport(smtpTransport({
              service: 'gmail',
              auth: {
                     user: 'infopalatos@gmail.com',
                     pass: 'Pro2019*'
                 }
          }));
          
          const mailOptions = {
              from: 'infopalatos@gmail.com', // sender address
              to: Encabezado[0].cEmail, // list of receivers
              subject: 'Factura de pago Probocaitos No. ' + Encabezado[0].prefijo + '-' + Encabezado[0].invoice_num, // Subject line
              html: myHTML
            };
          console.log(mailOptions);
          
            transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
           });






            
            var jsonObj = {
              Encabezado,
              Productos,
              Impuestos,
              Totales,  
              respuesta: "Success"
            }
             // console.log(jsonObj);
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