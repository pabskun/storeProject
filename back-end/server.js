var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./api/config/database');
var connection = config.database;
//Se declaran todos los accesos de las rutas
userRoutes = require('./api/components/users/user.route');


var app = express();
app.use(express.static(__dirname + "/client"));//maneja archivos estáticos como un app web
app.use(express.static(__dirname + "/client/content/css/bootstrap.css.map"));

app.use(bodyParser.json());
//Permite recibir post
app.use(bodyParser.urlencoded());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(passport.initialize());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.

mongoose.connect(config.database, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.

  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

// Conexion a todas la rutas
app.use('/api', userRoutes);//se define el versionamiento del api
