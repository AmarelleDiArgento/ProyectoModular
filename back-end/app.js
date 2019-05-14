var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

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
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true})); 
//access cors  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', '*');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });

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
app.use('/', indexRouter);
//url login
app.post('/auth', login)
//urls user
app.post('/createuser', user)
app.put('/updateuser', user)
app.delete('/deleteuser', user)
app.post('/getdatauser', user)
app.get('/getdatauser', user)
//urls rol
app.post('/createrol', rol)
app.put('/updaterol', rol)
app.delete('/deleterol', rol)
app.post('/getdatarol', rol)
app.get('/getdatarol', rol)
//urls category
app.post('/createcategory', category)
app.put('/updatecategory', category)
app.delete('/deletecategory', category)
app.post('/getdatacategory', category)
app.get('/getdatacategory', category)
//urls tax
app.post('/createtax', tax)
app.put('/updatetax', tax)
app.delete('/deletetax', tax)
app.post('/getdatatax', tax)
app.get('/getdatatax', tax)
//urls tax
app.post('/createproduct', product)
app.put('/updateproduct', product)
app.delete('/deleteproduct', product)
app.post('/getdataproduct', product)
app.get('/getdataproduct', product)
//urls permission menu
app.post('/getdatapermission', permission)
//urls sale
app.post('/createsale', sale)
app.put('/updatesale', sale)
app.delete('/deletesale', sale)
app.post('/getdatasale', sale)
app.get('/getdatasale', sale)
//urls saleproduct
app.post('/createsaleproduct', saleproduct)
app.put('/updatesaleproduct', saleproduct)
app.delete('/deletesaleproduct', saleproduct)
app.post('/getdatasaleproduct', saleproduct)
app.get('/getdatasaleproduct', saleproduct)
//urls privilege
app.post('/createprivilege', privilege)
app.put('/updateprivilege', privilege)
app.delete('/deleteprivilege', privilege)
app.post('/getdataprivilege', privilege)
app.get('/getdataprivilege', privilege)
//urls privilege
app.post('/createmodulo', modulo)
app.put('/updatemodulo', modulo)
app.delete('/deletemodulo', modulo)
app.post('/getdatamodulo', modulo)
app.get('/getdatamodulo', modulo)
//urls privilege
app.post('/createrolprivilege', rolprivilege)
app.put('/updaterolprivilege', rolprivilege)
app.delete('/deleterolprivilege', rolprivilege)
app.post('/getdatarolprivilege', rolprivilege)
app.post('/getdatarolprivileges', rolprivilege)
//urls pod
app.post('/createpod', pod)
app.post('/updatepod', pod)
app.post('/deletepod', pod)
app.post('/getdatapod', pod)
app.get('/getdatapod', pod)
//urls poduser
app.post('/createpoduser', poduser)
app.post('/updatepoduser', poduser)
app.post('/deletepoduser', poduser)
app.post('/getdatapoduser', poduser)
app.get('/getdatapoduser', poduser)


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