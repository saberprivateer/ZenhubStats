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

zhsApp.controller('zhsCtrl', function($scope, $http, issueService){

      google.charts.load('current', {'packages':['corechart','scatter']});

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

var fetch = function(issue) {
    $http.get('http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/issues/'+issue+'?access_token='+at)
        .then(function(data)
        {
            console.log('Success of fetch');
            return data;
//            console.log(data);
        });
};

$scope.scatterdraw = function() {
var issue_info;
var i;
for(i=500;i<510;i++){
issueService.issueInfo(i).then(function (data) {
                    issue_info = data;
//                    console.log(JSON.stringify(data) + "pipeline");
                      console.log(issue_info.pipeline.name + "pipeline");
                });
};
//https://tylermcginnis.com/angularjs-factory-vs-service-vs-provider-5f426cfe6b8c#.lmx54idqm
google.charts.setOnLoadCallback(scatterplot);
function scatterplot () {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Hours Studied');
        data.addColumn('number', 'Final');
        data.addRows([
          [0, 67], [1, 88], [2, 77],
          [3, 93], [4, 85], [5, 91],
          [6, 71], [7, 78], [8, 93],
          [9, 80], [10, 82],[0, 75],
          [5, 80], [3, 90], [1, 72],
          [5, 75], [6, 68], [7, 98],
          [3, 82], [9, 94], [2, 79],
          [2, 95], [2, 86], [3, 67],
          [4, 60], [2, 80], [6, 92],
          [2, 81], [8, 79], [9, 83],
          [3, 75], [1, 80], [3, 71],
          [3, 89], [4, 92], [5, 85],
          [6, 92], [7, 78], [6, 95],
          [3, 81], [0, 64], [4, 85],
          [2, 83], [3, 96], [4, 77],
          [5, 89], [4, 89], [7, 84],
          [4, 92], [9, 98]
        ]);

        var options = {
          width: 800,
          height: 500,
          chart: {
            title: 'Process Control Diagram',
            subtitle: 'Testing'
          },
          hAxis: {title: 'Date'},
          vAxis: {title: 'Days'}
        };

        var chart = new google.charts.Scatter(document.getElementById('scatterchart_material'));

        chart.draw(data, google.charts.Scatter.convertOptions(options));
};
};


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

zhsApp.service('issueService', function ($http) {

    this.issueInfo = function(issue_number){

        var dataUrl = "http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/issues/";
        var at = 'ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad';

        // Simple GET request example :
        return $http({
            method: 'GET',
            dataType: "json",
            url: dataUrl+issue_number+"?access_token="+at
        })
        .then( function(data, status, headers, config) {

            // this callback will be called asynchronously
            // when the response is available

            return data.data;

        }, function (error) {console.log('totally errored');

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

});