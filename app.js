'use strict';
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

let db = require('./models')
var routerRegister = require('./routers/router.register.js');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Configure session
app.use(session({
  secret: '95371e2f-a487-4e22-a9e2-8b6356b85453',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

// Register the Routers
routerRegister(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

// var server = app.listen(app.get('port'), function () {
//     console.log('Express server listening on port ' + server.address().port);
// });
db.sequelize
  .authenticate()
  .then(() => {
    app.listen(3000, ()=>console.log("app started on 3000"))
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });