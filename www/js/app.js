// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
angular.module('starter', ['ionic','ngCordova'])



.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })

    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'welcomeCtrl'
		  
        })
		
	
    
    $urlRouterProvider.otherwise("/signin");
})

.controller('SignInCtrl', function($scope, $state, $http,$cordovaSQLite,$location) {

	$scope.DoSubmitAction=function(sq){
	alert("Get all data");
	  var query = "SELECT firstname, lastname FROM people";
	 alert(db);
	    $cordovaSQLite.execute(db, query, []).then(function(res) {
            if(res.rows.length > 0) {
            		 alert("row length");
                for(var i = 0; i < res.rows.length; i++) {
                	 alert("for loop");
                    //console.log("SELECTED -> " + res.rows.item(i).firstname + " " + res.rows.item(i).lastname);
					alert("SELECTED -> " + res.rows.item(i).firstname + " " + res.rows.item(i).lastname);
                }
            } else {
               // console.log("No results found");
			alert("No results found");
            }
        }, function (err) {
            //console.error(err);
			alert("Error");
			
        });
	
		
	
	}
	
	$scope.select=function(sq){
	alert("ssssss");
	}
	
	
			
	
})
.controller('welcomeCtrl', function($scope, $state, $http,$ionicLoading) {

})



.run(function($ionicPlatform,$cordovaSQLite,$location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    db = $cordovaSQLite.openDB("populated.db");

	 //db = $cordovaSQLite.openDB("resources/populated.db");
	 window.plugins.sqlDB.copy("platforms/android/assets/populated.db", function() {
	 	// alert("db success upone");
           db = $cordovaSQLite.openDB("platforms/android/assets/populated.db");
            //alert("db success under"+db);
        }, function(error) {
        	// alert("db error");
            console.error("There was an error copying the database: " + error);
             db = $cordovaSQLite.openDB("platforms/android/assets/populated.db");
             //alert("db error under"+db);
        });
	
	 });
	  //db =  $cordovaSQLite.openDB("resources/populated.db");
	   //db = $cordovaSQLite.openDB("populated.db");
		 //db = window.openDatabase("populated.db", "1.0", "Cordova Demo", 200000);
		//db.transaction(populateDB, errorCB, successCB);
			
   
   //db = $cordovaSQLite.openDB("populated.db");
			

})
