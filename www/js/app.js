// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db=null;
var app = angular.module('starter', ['ionic', 'ngResource','ngCordova'])
.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB("maxDb.sqlite");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS demo (id integer primary key, firstname text)");
  });
})
.controller('userCTRL',['APIFactory','$scope','',function(APIFactory,$scope,$cordovaSQLite){
  APIFactory.GetUsers({},function(err,result){
    console.log('result ' , result);
  })

$scope.insert = function(firstname) {
        var query = "INSERT INTO demo (firstname) VALUES (?)";
        $cordovaSQLite.execute(db, query, [firstname]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
            alert("inserted");
        }, function (err) {
            console.error(err);
        });
    }

    $scope.show = function() {
         var query = "SELECT firstname FROM demo";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname );
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

}])
