var mysql = require('mysql'),
  config = require("../config");
var enigma = require('enigma-code')
let converter = require('json-2-csv');

const valorEncriptación = 8
let key = '3456#@|#lM'

var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");
var express = require('express');
var router = express.Router();
//init pool mysql
var connection = mysql.createPool(config.db);

var saleModel = {}

let ins = `call proyectomodular.saleins(?,?,?,?,?,?,?);`;
let acc = `call proyectomodular.saleupdacco(?,?,?);`;
let del = [`
          delete FROM proyectomodular.sale_product
          where sp_sale_id not in(
            select dobles.saled from (
              select min(sale_id) as saled, count(*) as cont, round(unix_timestamp(s.date)/(15)) as timekey
              FROM proyectomodular.sale as s
              group by timekey
              order by cont desc) as dobles )`,
  `delete from proyectomodular.sale 
          where sale_id not in(
            SELECT distinct sp_sale_id FROM proyectomodular.sale_product
            )`
];
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

  let pass;
  enigma.genHash(valorEncriptación, key, saleData.password, function (error, hash) {
    if (error) return console.error(error)
    pass = hash
  })

  if (connection) {
    connection.query(acc, [
      saleData.sale_id,
      saleData.user_id,
      pass
    ], function (error, rows) {

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
  if (connection) {
    connection.query(del.join(';'), function (error, rows) {
      if (error) {
        //console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          console.log("Limpio!");

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
    connection.query(queries.join(';'), function (error, rows) {
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

          if (saleData.type === 'Correo') {

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
            myHTML += '<div class="row center">' +
              '<div class="row">' +
              '<div class="container">' +
              '<img src="https://venturaterreros.com/wp-content/uploads/2018/05/probocaditos-ventura-soacha.jpg" style="display: table; margin: 0 auto; width:30%;">' +
              '</div>' +
              '<div  style="display: table; margin: 0 auto;">' +
              JSON.stringify(Encabezado[0].pod) + '' +
              '</div>' +
              '<div  style="display: table; margin: 0 auto;">' +
              'NIT: ' + JSON.stringify(Encabezado[0].nit) + '  TEL' + JSON.stringify(Encabezado[0].phone) + '' +
              '</div>' +
              '<div  style="display: table; margin: 0 auto;">' +
              'REGIMEN COMÚN ' +
              JSON.stringify(Encabezado[0].address) + '' +
              '</div>' +
              '<br>' +

              '<div class="row left-align" style="display: table; margin: 0 auto;">' +
              '<div class="col s12 center">FACTURA DE VENTAS</div>' +
              '<div class="col s12 center" style="display: table; margin: 0 auto;">' + JSON.stringify(Encabezado[0].prefijo) + '-' + JSON.stringify(Encabezado[0].invoice_num) + '</div>' +
              '</div>' +
              '<br>' +
              '<div class="container" style="display: table; margin: 0 auto;">' +
              '<div class="row">' +
              '<div class="col s6">' +
              '</div>' +
              '<div class="col s6" style="text-align: right;">' +
              'Fecha:' +
              JSON.stringify(Encabezado[0].date) + '<br>' +
              '</div>' +
              '<br>' +
              '</div>' +
              '<div class="row">' +
              '<div class="container" style="display: table; margin: 0 auto;">' +
              'Vendedor:' + JSON.stringify(Encabezado[0].uName) + '' +
              '</div>' +
              '<div class="container" style="display: table; margin: 0 auto;">' +
              'Cliente:' + JSON.stringify(Encabezado[0].cName) + '' +
              '</div>' +
              '<div class="container" style="display: table; margin: 0 auto;">' +
              'Forma de pago:' + JSON.stringify(Encabezado[0].cardpayment) + '' +
              '</div>' +
              '</div>' +
              '<br>' +
              '<table style="display: table; margin: 0 auto;">' +
              '<tr>' +
              '<th>Cant.</th>' +
              '<th>Descripcion</th>' +
              '<th>Total $</th>' +
              '</tr>';

            for (var p = 0; p < Productos.length; p++) {
              myHTML += '<tr>' +
                '<td style="text-align: center; vertical-align: middle;">' + JSON.stringify(Productos[p].cantidad) + '</td>' +
                '<td style="text-align: center; vertical-align: middle;">' + JSON.stringify(Productos[p].producto) + '</td>' +
                '<td style="text-align: center; vertical-align: middle;">' + JSON.stringify(Productos[p].precio) + '</td>' +
                '</tr>';
            }

            myHTML += '</table>' +
              '<div class="row left-align" >' +
              '<br>' +
              '<div class="col s3 right-align" style="text-align: right;"> TOTAL $ ' + JSON.stringify(Totales[0].Total) + '</div>' +
              '</div>' +
              '<br>' +
              '<div class="row">' +
              '<div class="col s12 center" style="display: table; margin: 0 auto;">INFORMACION TRIBUTARIA ' +
              '</div>' +
              '<div>';
            myHTML += '<div class="col s3" style="display: table; margin: 0 auto;">&nbsp;&nbsp; Tipo   &nbsp;&nbsp;    %  &nbsp;&nbsp;  %  VLR BASE $  &nbsp;&nbsp;   VLR IMP $ &nbsp;&nbsp; </div>';

            for (var i = 0; i < Impuestos.length; i++) {
              myHTML += '<div class="col s3" style="display: table; margin: 0 auto;">&nbsp;&nbsp; ' + JSON.stringify(Impuestos[i].impuesto) + '&nbsp;&nbsp;&nbsp;' + JSON.stringify(Impuestos[i].porcentaje) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' + JSON.stringify(Impuestos[i].base) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ' + JSON.stringify(Impuestos[i].val_impuesto) + '&nbsp;&nbsp;</div>';
            }

            myHTML += '</div>' +
              '<br>' +
              '<div class="row left-align">' +
              '<div class="col s12 center" style="display: table; margin: 0 auto;">R DIAN: ' + Encabezado[0].rdian + '</div>' +
              '<div class="col s12 center" style="display: table; margin: 0 auto;">FECHA ' + Encabezado[0].daterdian + '</div>' +
              '<div class="col s12 center" style="display: table; margin: 0 auto;">RANGO 0 A ' + Encabezado[0].billing_limit + '</div>' +
              '</div>' +

              '<div class="col s12 cente-align" style="display: table; margin: 0 auto;">' +
              '<h5>' +
              'GRACIAS POR SU COMPRA' +
              '</h5>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>' +
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



            transporter.sendMail(mailOptions, function (err, info) {
              if (err)
                console.log(err)
              else
                console.log(info);
            });

          }

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





saleModel.dataAllSaleCSV = function (saleData, callback) {
  let p, info;

  let cer = [`
        Select if(s.client_id = '1020121', pd.costcenter, s.client_id) as nitcliente, DATE_FORMAT(s.date, "%Y-%m-%d") as Fecha, 
        p.code as CodigoProducto, pd.warehouse as Bodega, "Und.", 
        if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')=1,0.19,
        if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')='1,2',0.19, 0)) as Iva, 
        sum(sp.gross_price) as Base, 
        if(pt_tax_id=2,(sum(sp.net_price) * 1.08)/100,0) as valConsumo, 
        if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')=2,0.08,
        if(GROUP_CONCAT(DISTINCT t.tax_id ORDER BY t.name ASC SEPARATOR ',')='1,2',0.08, 0)) as consumo, 
        pd.costcenter as ccosto , sum(sp.quantity) as Cantidad, s.discount as descuento
        from pod as pd 
        left join sale as s on pd.pod_id = s.pod_id
        left join user as c on c.user_id = s.client_id
        left join sale_product as sp on s.sale_id = sp.sp_sale_id
        left join product as p on sp.sp_product_id = p.product_id
        left join product_tax as pt on p.product_id = pt.pt_product_id
        left join tax as t on t.tax_id = pt.pt_tax_id
        where s.date between concat("${saleData.since} 00:00:00") and concat("${saleData.until} 23:59:59")
        and s.accountant = 1 and sp.quantity > 0 and pd.pod_id = ${saleData.pod_id}
        group by nitcliente, Fecha, CodigoProducto, Bodega, ccosto
        order by Fecha, nitcliente, p.code asc
        `,
    `SELECT *, DATE_FORMAT(now(), "%Y-%m-%d") as ahora FROM proyectomodular.pod WHERE pod_id = ${saleData.pod_id};`
  ]
  if (connection) {
    connection.query(cer.join(';'), function (error, rows) {
      if (error) {
        console.log(error)
        callback(null, {
          "respuesta": "Error de conexión"
        })
      } else {
        if (rows.length != 0) {
          //console.log(rows);
          info = rows[0];
          p = rows[1];
          p = p[0];
          console.log(p.email);

          let options = {
            delimiter: {
              wrap: '"', // Double Quote (") character
              field: ',', // Comma field delimiter
              eol: '\n' // Newline delimiter
            },
            prependHeader: false,
            sortHeader: false,
            excelBOM: true,
            trimHeaderValues: true,
            trimFieldValues: true,
          };
          let json2csvCallback = function (err, data) {
            if (err) throw err;

            var transporter = nodemailer.createTransport(smtpTransport({
              service: 'gmail',
              auth: {
                user: p.email,
                pass: 'Pro2019*'
              }
            }));
            let rango = '';
            if (saleData.since === saleData.until) {
              rango = saleData.since;
            } else {
              rango = saleData.since + 'al' + saleData.until;
            }
            const mailOptions = {
              from: p.email, // sender address
              to: 'ewige.qual@gmail.com', // list of receivers
              subject: 'Cierre Pto: ' + p.code + " " + p.name, // Subject line
              html: '<b>Adjunto cierre de ventas ' + p.name + " del " + rango + '</b>', // html body     
              attachments: [{
                filename: p.code + rango + '.csv',
                content: data
              }]
            };

            console.log(rows[1]);


            transporter.sendMail(mailOptions, function (err, info) {
              if (err)
                console.log(err)
              else
                console.log(info);
            });
          };

          converter.json2csv(info, json2csvCallback, options);

          var jsonObj = {
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