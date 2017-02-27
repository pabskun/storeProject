var express = require('express');
var	router = express.Router();
var userController = require('./user.controller.js');

//Para las rutas con id
router.param('id',function(req, res, next, id){
  req.body.id = id;
  next();
});


//Declaracion de las rutas

router.route('/users')
  .post(function(req, res){
    userController.save(req,res);
 	});

router.route('/users')
  .get(function(req, res){
      userController.findAll(req,res);
  });
router.route('/users/:id')
  .delete(function(req, res){
    userController.remove(req,res);
 	});
router.route('/users')
  .put(function(req, res){
    userController.update(req,res);
 	});




// Se exporta el modulo
module.exports = router;
