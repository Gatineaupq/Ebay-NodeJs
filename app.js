/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var crypto = require('crypto');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
//load customers route
var customers = require('./routes/customers'); 
var meher = require('./routes/meher');
var app = express();
var connection  = require('express-myconnection'); 
//var mysql = require('mysql');
var sess=null;
// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({ keepExtensions: true, uploadDir:'/Users/prashantyadav/Documents/images/uploads' }));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
var flash = require('connect-flash');
app.use(flash());
/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/
/*app.use(
    connection(mysql,{        
        host: 'localhost',
        user: 'root',
        password : 'admin',
        port : 3306, //port mysql
        database:'nodejs'
    },'request')
);*/

//route index, hello world
//app.get('/home', routes.index);//route customer list
app.get('/history', customers.getHistoryPage);

app.get('/getBiddingHistory', customers.getBiddingHistory);
app.get('/getPurchaseHistory', customers.getPurchaseHistory);
app.get('/getSellingHistory', customers.getSellingHistory);
app.get('/search', customers.searchproducts);
/////prashant luthra/////
app.get('/', customers.login);
//app.get('/users', customers.list);
app.get('/login', customers.login);
app.get('/signup', customers.signup);
app.post('/signup', customers.saveUser);
app.post('/login', customers.logindo);
app.post('/rating', customers.rate)
//////end//////

/////Meher/////
app.get('/getCategories', meher.getCategories);
app.get('/getProducts/:name',meher.getProducts);
app.get('/updateProduct', meher.updateProduct);

app.post('/updateProduct', meher.saveUpdatedProduct);
//////end//////
app.get('/addProduct', customers.addProduct);
app.post('/addProduct', customers.saveProduct)
app.get('/home', customers.home);

//var CronJob = require('cron').CronJob;
//new CronJob('10 * * * * *', function(){
//    console.log('You will see this message every second');
//}, null, true, "America/Los_Angeles");

app.get('/upload', customers.imageForm);
app.post('/upload', customers.uploadImage);
//Kiran

app.get('/', home.start);

app.get('/getUserDetails',home.getUserDetails);

app.get('/updateUserDetails',home.update);
app.post('/update',home.updateUserDetails);
app.post('/searchProducts',home.searchProducts);
app.get('/getAllCustomers',home.getCustomers);
app.get('/getAllSellers',home.getSellers);

app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
