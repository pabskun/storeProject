(function(){
  angular
  .module('myApp')
  .service('userService', userService);

  function userService($http){
    var users = [{
      firstName: 'Pabs',
      lastName:'Mon',
      age:29
    }];
    var publicAPI = {
      setUsers : _setUsers,
      getUsers : _getUsers,
      deleteUsers : _deleteUsers,
      updateUsers : _updateUsers,
      getId : _getId,
      setId: _setId

    };
    return publicAPI; // todas las funciones que sean llamadas por ajax deben estar debajo del return, para que ciuando angular corra el script haga el return y devuelva el api , las funciones debajo del return son privadas y se devuelve el api que es el que contiene las funciones


    function _setUsers(pUser){
      //users.push(pUser);
      return $http.post('http://localhost:8000/api/users',pUser)

    }

    function _getUsers(){
      return $http.get('http://localhost:8000/api/users');
    }

    function _deleteUsers(id){
      return $http.delete('http://localhost:8000/api/users/' + id);
    }
    function _updateUsers(pUser){
      console.log(pUser);
      return $http.put('http://localhost:8000/api/users',pUser);
    }

    function _getId(){
      var id = Number(localStorage.getItem('id'));
      if(id==null){
        id = 0;
      }else{
        id++;
      }
      return id;
    }
    function _setId(pid){
    localStorage.setItem('id', pid);

    }

  }

})();
