'use strict';

var zhsApp = angular.module('zhsApp', ['ngMaterial'])
    .run(function($log){
        $log.debug("MyApp is ready!");
        })
    .config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

zhsApp.controller('zhsCtrl', function($scope, $http){

      google.charts.load('current', {'packages':['corechart']});
});