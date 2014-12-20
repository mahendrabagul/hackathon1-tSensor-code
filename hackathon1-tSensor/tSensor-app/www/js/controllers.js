
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   loadData();
}

baseURL = "http://192.168.1.163:1337/";

angular.module('starter.controllers', [])

.controller('HomeCtrl', function($http, $scope, $timeout, $ionicLoading) {

    // CURRENT TEMPERATURE

   function loadData(){
      $http.get(baseURL + 'currenttemp/find', {
    headers: {
        "appKey": "qQasdasdazz3435353fftt2145"
    }
    }).success(function(data) {
        $scope.livetemperatures = data;
        if(data.temperatureInC>29){
          // navigator.vibrate(1000);
        }
        console.log("DONE");
    }); 
  }

  var poll = function() {
        $timeout(function() {
            loadData();
            poll();
        }, 5000);
    };     
   
   poll();
   loadData();

  

   
    // REPORTS

    $http.get(baseURL + 'tempreport/find', {
    headers: {
        "appKey": "qQasdasdazz3435353fftt2145"
    }
    }).success(function(data) {
        $scope.avgTempLastHour = data.avgTempLastHour;
        $scope.highestTempCurrentMonth = data.highestTempCurrentMonth;
        $scope.lowestTempCurrentMonth = data.lowestTempCurrentMonth;
    });
})

.controller('HomeStatsCtrl', function($http, $scope) {
  $http.get(baseURL + 'tempreport/find', {
  headers: {
      "appKey": "qQasdasdazz3435353fftt2145"
  }
  }).success(function(data) {
      $scope.highestTempCurrentMonth = data.highestTempCurrentMonth;
      $scope.lowestTempCurrentMonth = data.lowestTempCurrentMonth
      $scope.avgTempLastMonth= data.avgTempLastMonth;
  })

  $http.get(baseURL + 'tempreport/find', {
    headers: {
        "appKey": "qQasdasdazz3435353fftt2145"
    }
    }).success(function(data) {
        $scope.avgTempLastHour = data.avgTempLastHour;
        $scope.highestTempCurrentMonth = data.highestTempCurrentMonth;
        $scope.lowestTempCurrentMonth = data.lowestTempCurrentMonth;
    });

});