app.factory('APIFactory', ['$resource', function (resource) {
    var Users = {};
    var UserCollection = resource('http://localhost:3000/api/AMPLUsers/:id',
                                  { 'id': '@id' },
                                  {
                                    update: {
                                      method: 'PUT' // this method issues a PUT request
                                    }
                                  });
    return{
        CreateUser: function (userFields, callback) {
            if (userFields) {
                UserCollection.Create(userFields,function(err,user) {
                    if (err) {
                        callback(err, null);
                    } else {
                        Users = user;
                        callback(null,Users);
                    }
                })
            } else {
                callback('userFields are mandatory', null);
            }
        },
        GetUsers: function (Id, callback) {
            UserCollection.query(function(err,user){
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, user);
                }
            })
        }
    };
}]);