'use strict';

var zhsApp = angular.module('zhsApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('yellow'); })
    .run(function($log){
        $log.debug("MyApp is ready!");
        })
    .config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

zhsApp.controller('zhsCtrl', function($scope, $http){

      google.charts.load('current', {'packages':['corechart']});


var req = {
  method: 'GET',
     url: 'http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/board?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
  //url: 'http://elections.huffingtonpost.com/pollster/api/polls.json?topic=2016-president&page=30',
  };

$http(req,{cache: true}).success(function(data){
console.log('success: '+data);
console.log('showing data= '+data.pipelines[0].issues.length);
$scope.board = data;
//console.log('$scope.board= '+JSON.stringify($scope.board));
   google.charts.setOnLoadCallback(designPie);
   google.charts.setOnLoadCallback(engineerPie);
            function designPie() {
                           var i;
                           var data = new google.visualization.DataTable();
                           data.addColumn('string','Pipeline');
                           data.addColumn('number','Qty');
                           data.addRows($scope.board.pipelines.length);
                           for (i=1;i<5;i++){
                             data.setCell(i,0,$scope.board.pipelines[i].name);
                             data.setCell(i,1,$scope.board.pipelines[i].issues.length);
                             }
                           var options = {
             //                pieHole: 0.4,
                            // width: 270,
                             //height: 250,
                             title: 'Design',
             //                tooltip: {
             //                text: 'percentage'},
             //                chartArea: {
             //                //top: 5,
             //                height: '100%'
             //                },
             colors: ['#f6c7b6', '#f3b49f', '#ec8f6e','#e6693e','#e0440e'],
                             pieSliceTextStyle: {
                               color: 'white'
                             },
                             legend: {
                             position: 'right'
                             }
                           };

                           var chart = new google.visualization.PieChart(document.getElementById('design_pie'));
                           chart.draw(data, options);
                         }
        function engineerPie() {
               var i;
               var data = new google.visualization.DataTable();
               data.addColumn('string','Pipeline');
               data.addColumn('number','Qty');
               data.addRows($scope.board.pipelines.length);
               for (i=7;i<$scope.board.pipelines.length;i++){
                 data.setCell(i,0,$scope.board.pipelines[i].name);
                 data.setCell(i,1,$scope.board.pipelines[i].issues.length);
                 }
               var options = {
 //                pieHole: 0.4,
                // width: 270,
                 //height: 250,
                 title: 'Engineering',
                 colors: ['#9FA8DA', '#7986CB','#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB','#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB'],
 //                tooltip: {
 //                text: 'percentage'},
 //                chartArea: {
 //                //top: 5,
 //                height: '100%'
 //                },
                 pieSliceTextStyle: {
                   color: 'white'
                 },
                 legend: {
                 position: 'right'
                 }
               };

               var chart = new google.visualization.PieChart(document.getElementById('engineering_pie'));
               chart.draw(data, options);
             }
      });

//var reqissue = {
//  method: 'GET',
//     url: 'http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/issues/333?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
//  //url: 'http://elections.huffingtonpost.com/pollster/api/polls.json?topic=2016-president&page=30',
//  };
//
//$http(reqissue,{cache: true}).success(function(data){
//console.log('success of issue');
////console.log(data);
//$scope.issue = data;
//
//});

$scope.checkform = function(thing) {
console.log($scope.issue_number);
};

//var reqissueevents = {
//  method: 'GET',
//     url: 'http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/issues/333/events?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
//  //url: 'http://elections.huffingtonpost.com/pollster/api/polls.json?topic=2016-president&page=30',
//  };
//
//$http(reqissueevents,{cache: true}).success(function(data){
//console.log('success of events');
////console.log(data);
//$scope.issueevents = data;
//
//});

});