'use strict';

var zhsApp = angular.module('zhsApp', ['ngMaterial'])
    .run(function($log){
        $log.debug("MyApp is ready!");
        })
    .config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

zhsApp.controller('zhsCtrl', function($scope, $http){

//      google.charts.load('current', {'packages':['corechart']});
var req = {
  method: 'GET',
     url: 'http://cors.io/?u=https://api.zenhub.io/p1/repositories/13550592/board?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
  //url: 'http://elections.huffingtonpost.com/pollster/api/polls.json?topic=2016-president&page=30',
  };

$http(req,{cache: true}).success(function(data){
console.log('success: '+data);
console.log(data);
$scope.board = data;
});

var reqissue = {
  method: 'GET',
     url: 'http://cors.io/?u=https://api.zenhub.io/p1/repositories/13550592/issues/433?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
  //url: 'http://elections.huffingtonpost.com/pollster/api/polls.json?topic=2016-president&page=30',
  };

$http(reqissue,{cache: true}).success(function(data){
console.log('success: '+data);
console.log(data);
$scope.issue = data;

});

var reqissueevents = {
  method: 'GET',
     url: 'http://cors.io/?u=https://api.zenhub.io/p1/repositories/13550592/issues/433/events?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
  //url: 'http://elections.huffingtonpost.com/pollster/api/polls.json?topic=2016-president&page=30',
  };

$http(reqissueevents,{cache: true}).success(function(data){
console.log('success: '+data);
console.log(data);
$scope.issueevents = data;

});

});