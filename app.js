var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var indexRouter = require('./routes/index');
const indexCar = require('./routes/CarRoutes')
var app = express();

const bodyParser = require('body-parser');

//mongo
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/apiproject";
mongoose.connect(
  url, 
  { useNewUrlParser: true }, 
  function(err, db) {
  if (err) throw err;
  console.log("Berhasil!");
});

//template engine setup
// app.use('view engine','html');
// app.engine('html',ejs.renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/car', indexCar)
console.log("Server Running")
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
