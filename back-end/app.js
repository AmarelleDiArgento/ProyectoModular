var createError = require('http-errors');
// var compression = require('compression');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const fs = require('fs');

// At the top of your server.js
process.env.PWD = process.cwd()


//routes
var indexRouter = require('./routes/index');
//route login
var login = require('./routes/login');
//route user
var user = require('./routes/user');
//route rol
var rol = require('./routes/rol');
//route category
var category = require('./routes/category');
//route tax
var tax = require('./routes/tax');
//route product
var product = require('./routes/product');
//route permission
var permission = require('./routes/permission');
//route sale
var sale = require('./routes/sale');
//route sale_product
var saleproduct = require('./routes/saleproduct');
//route module
var modulo = require('./routes/modulo');
//route privilege
var privilege = require('./routes/privilege');
//route rolprivilege
var rolprivilege = require('./routes/rolprivilege');
//route pod
var pod = require('./routes/pod');
//route poduser
var poduser = require('./routes/poduser');



// Initialize the app
var app = express()
app.use(bodyParser());
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(compression());
//access cors  
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Then
app.use(express.static(process.env.PWD + '/public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//urls
//url init
app.disable('etag'); 
app.use('/', indexRouter);
//url login
app.post('/auth', login)
//urls user
app.post('/createuser', user)
app.post('/createclient', user)
app.post('/updateuser', user)
app.post('/updateuserpassword', user)
app.post('/resetuserpassword', user)
app.post('/deleteuser', user)
app.post('/getdatauser', user)
app.post('/getdatapoduser', user)
app.get('/getdatausers', user)
app.post('/assignuserpod', user)
app.post('/resetuserpod', user)
app.post('/getpoduser', user)
app.post('/updatepoduser', user)
//urls rol
app.post('/createrol', rol)
app.post('/updaterol', rol)
app.post('/deleterol', rol)
app.post('/getdatarol', rol)
app.get('/getdatarols', rol)
//urls category
app.post('/createcategory', category)
app.post('/updatecategory', category)
app.post('/deletecategory', category)
app.post('/getdatacategory', category)
app.get('/getdatacategorys', category)
//urls tax
app.post('/createtax', tax)
app.post('/updatetax', tax)
app.post('/deletetax', tax)
app.post('/getdatatax', tax)
app.get('/getdatataxs', tax)
//urls product
app.post('/createproduct', product)
app.post('/updateproduct', product)
app.post('/deleteproduct', product)
app.post('/getdataproduct', product)
app.get('/getdataproducts', product)
app.post('/getproductaxs', product)
app.post('/updateproductax', product)
//urls permission menu
app.post('/getdatapermission', permission)
//urls sale
app.post('/createsale', sale)
app.post('/updatesale', sale)
app.post('/deletesale', sale)
app.post('/getdatasale', sale)
app.post('/getdatasalebetween', sale)
app.post('/getdatasalebetweensum', sale)
app.post('/getdatasaleinvoice', sale)
app.get('/getdatasales', sale)

//urls saleproduct
app.post('/createsaleproduct', saleproduct)
app.post('/updatesaleproduct', saleproduct)
app.post('/deletesaleproduct', saleproduct)
app.post('/getdatasaleproduct', saleproduct)
app.get('/getdatasaleproducts', saleproduct)
//urls privilege
app.post('/createprivilege', privilege)
app.post('/updateprivilege', privilege)
app.post('/deleteprivilege', privilege)
app.post('/getdataprivilege', privilege)
app.get('/getdataprivileges', privilege)
//urls modulo
app.post('/createmodulo', modulo)
app.post('/updatemodulo', modulo)
app.post('/deletemodulo', modulo)
app.post('/getdatamodulo', modulo)
app.get('/getdatamodulos', modulo)
//urls rol privilege
app.post('/createrolprivilege', rolprivilege)
app.post('/updaterolprivilege', rolprivilege)
app.post('/deleterolprivilege', rolprivilege)
app.post('/getdatarolprivilege', rolprivilege)
app.post('/getdatarolprivileges', rolprivilege)
//urls pod
app.post('/createpod', pod)
app.post('/updatepod', pod)
app.post('/deletepod', pod)
app.post('/getdatapod', pod)
app.get('/getdatapods', pod)
//urls poduser
app.post('/createpoduser', poduser)
app.post('/updatepoduser', poduser)
app.post('/deletepoduser', poduser)
app.post('/getdatapoduser', poduser)
app.get('/getdatapodusers', poduser)
//urls email
app.post('/sendemail', email)


//file text sql
// writeFile();
// //function create file
// function writeFile(){
//   var fileName = 'c://Monitoreo/file.txt';
//   fs.exists(fileName, function (exists) {
//       if(exists){

//       } else {
//           fs.writeFileSync(fileName);
//       }
//   });
// }

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;