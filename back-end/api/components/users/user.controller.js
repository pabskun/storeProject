//Requerimos el modelo  de usuarios
var User = require('./user.model.js');
var config = require('../../config/database');
var bcrypt = require('bcrypt');

module.exports.save = function(req,res){ //exporta el controlador
  var currentPass;
  bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(req.body.password,salt,function(err,hash){
        currentPass = hash;


        var newUser = new User({
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          email:req.body.email,
          password:currentPass
        });

        newUser.save(function(err){
          if(err){
            res.json({success:false,msg:'El correo electrónico ya existe.'});
          }else {
            res.json({success:true,msg:'Se ha registrado correctamente.'});
          }
        });

      });
    });
}

module.exports.findAll = function(req,res){
  User.find().then(function(users){
    res.send(users);
  });
};

module.exports.remove = function(req,res){
  console.log(req.body.id);
  User.findByIdAndRemove({_id:req.body.id}).then(function(data){
    res.json({success:true,msg:'Se ha eliminado correctamente.'});
  });

}
module.exports.update = function(req,res){
  console.log(req.body.id);
  User.findByIdAndUpdate(req.body._id,{$set:req.body}).then(function(data){
    res.json({success:true,msg:'Se ha eliminado correctamente.'});
  });

}
