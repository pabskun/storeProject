(function(){
  angular
    .module('myApp')
    .controller('userController', userController);
    function userController(userService){ //se inyecta el service userService en el controlador para que se tenga acceso
      //controlador
      var userCtrl = this; //binding del controlador con el html, solo en el controlador
      userCtrl.btnadd = true;
      userCtrl.btnedit = false;

      function init(){ // función que se llama así misma para indicar que sea lo primero que se ejecute
        userService.getUsers()
          .success(function(data){
            userCtrl.users = data;

          });
      }
      init();

      userCtrl.save= function(){
        var newUser ={
          idicito: userService.getId(),
          firstName : userCtrl.firstName,
          lastName : userCtrl.lastName,
          email : userCtrl.email,
          password: userCtrl.password
        }

        userService.setUsers(newUser)
        .success(function(data){
          console.log(data);
          init();
          userCtrl.firstName = null;
          userCtrl.lastName = null;
          userCtrl.email = null;
          userCtrl.password = null;
        })
        userService.setId(newUser.idicito);
        console.log(newUser);

      }

      userCtrl.delete = function(id){
        console.log(id);
        userService.deleteUsers(id)
        .success(function(data){
          init();
        })
      }

      userCtrl.update = function(objUser){
        userCtrl.btnadd = false;
        userCtrl.btnedit = true;
        userCtrl.id = objUser._id;
        userCtrl.firstName = objUser.firstName;
        userCtrl.lastName = objUser.lastName;
        userCtrl.email = objUser.email;
        userCtrl.password = objUser.password;

      }
      userCtrl.edit = function(){


        var newUser ={
          _id: userCtrl.id,
          firstName : userCtrl.firstName,
          lastName : userCtrl.lastName,
          email : userCtrl.email,
          password: userCtrl.password
        }

        userService.updateUsers(newUser)
        .success(function(data){
          console.log(data);
          init();
          userCtrl.btnadd = true;
          userCtrl.btnedit = false;
          userCtrl.firstName = null;
          userCtrl.lastName = null;
          userCtrl.email = null;
          userCtrl.password = null;
        })

      }
    }
     //se establece un objeto de angular normal


})();
