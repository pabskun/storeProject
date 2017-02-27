var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../models/user.model');
var config = require('../config/database');

module.exports = function(passport){
  var opts = {};
  opts.secretOrKey = 'ksk';
  passport.use(new JwtStrategy(opts,function(jwt_payload,done){
    User.find({id:jwt_payload.sub},function(err,user){
      if(err){
        return done(err,false);
      }
      if(user){
        done(null,user);
      }else{
        done(null,false);
      }
    });
  }));
};
