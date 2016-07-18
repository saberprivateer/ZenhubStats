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

zhsApp.controller('zhsCtrl', function($scope, $http, issueService, dataService){

      google.charts.load('current', {'packages':['corechart','scatter','timeline']});

var req = {
  method: 'GET',
     url: 'http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/board?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
  //url: 'http://elections.huffingtonpost.com/pollster/api/polls.json?topic=2016-president&page=30',
  };

//The Pie Charts
$http(req,{cache: true}).success(function(data){
$scope.board = data;


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
                             title: 'Design by Issues',
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
   google.charts.setOnLoadCallback(designPiePoints);
   function designPiePoints() {
                                   var i;
                                   var j;
                                   var stageVal;
                                   var data = new google.visualization.DataTable();
                                   data.addColumn('string','Pipeline');
                                   data.addColumn('number','Points');
                                   data.addRows($scope.board.pipelines.length);
                                   for (i=1;i<5;i++){
                                     data.setCell(i,0,$scope.board.pipelines[i].name);
//                                     console.log($scope.board.pipelines[i].name + " has "+$scope.board.pipelines[i].issues.length+" issues.");
                                     stageVal=0;
                                     for(j=0;j<$scope.board.pipelines[i].issues.length;j++){
                                     if($scope.board.pipelines[i].issues[j].hasOwnProperty("estimate")){
                                     stageVal = stageVal + $scope.board.pipelines[i].issues[j].estimate.value;

//                                     console.log("Issue "+$scope.board.pipelines[i].issues[j].issue_number+" is "+$scope.board.pipelines[i].issues[j].estimate.value+" points and in "+$scope.board.pipelines[i].name);
                                     }
                                     }
                                     data.setCell(i,1,stageVal);
                                     }
                                   var options = {
                     //                pieHole: 0.4,
                                    // width: 270,
                                     //height: 250,
                                     title: 'Design by Points',
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

                                   var chart = new google.visualization.PieChart(document.getElementById('design_pie_points'));
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
                 title: 'Engineering by Issues',
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
   google.charts.setOnLoadCallback(engineeringPiePoints);
   function engineeringPiePoints() {
                                                var i;
                                                var j;
                                                var stageVal;
                                                var data = new google.visualization.DataTable();
                                                data.addColumn('string','Pipeline');
                                                data.addColumn('number','Points');
                                                data.addRows($scope.board.pipelines.length);
                                                for (i=7;i<$scope.board.pipelines.length;i++){
                                                  data.setCell(i,0,$scope.board.pipelines[i].name);
//                                                  console.log($scope.board.pipelines[i].name + " has "+$scope.board.pipelines[i].issues.length+" issues.");
                                                  stageVal=0;
                                                  for(j=0;j<$scope.board.pipelines[i].issues.length;j++){
                                                  if($scope.board.pipelines[i].issues[j].hasOwnProperty("estimate")){
                                                  stageVal = stageVal + $scope.board.pipelines[i].issues[j].estimate.value;

//                                                  console.log("Issue "+$scope.board.pipelines[i].issues[j].issue_number+" is "+$scope.board.pipelines[i].issues[j].estimate.value+" points and in "+$scope.board.pipelines[i].name);
                                                  }
                                                  }
                                                  data.setCell(i,1,stageVal);
                                                  }
                                                var options = {
                                  //                pieHole: 0.4,
                                                 // width: 270,
                                                  //height: 250,
                                                  title: 'Engineering by Points',
                                  //                tooltip: {
                                  //                text: 'percentage'},
                                  //                chartArea: {
                                  //                //top: 5,
                                  //                height: '100%'
                                  //                },
                                  colors: ['#9FA8DA', '#7986CB','#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB','#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB'],
                                                  pieSliceTextStyle: {
                                                    color: 'white'
                                                  },
                                                  legend: {
                                                  position: 'right'
                                                  }
                                                };

                                                var chart = new google.visualization.PieChart(document.getElementById('engineering_pie_points'));
                                                chart.draw(data, options);
                             }


   });


var fetch = function() {
var at = 'ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad';
    $http.get('http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/board/?access_token='+at)
        .then(function(data)
        {
            console.log('Success of fetch');
            return data;
        });
};

var arrayWithIds = [500, 501, 502, 503, 504, 505, 506]
$scope.resources = [];
$scope.issue_hold;

for (var j = 0; j < arrayWithIds.length; j++) {
    issueService.zhissuedata(arrayWithIds[j]).then(function(data) {
        $scope.resources.push(data.pipeline);
    },function(error) {
        alert(error.message);
    });
}


    $scope.codepipeline = [];
    $scope.issue_info = [];
    $scope.track = 0;
    $scope.testpipeline = [];

function collectIE(i) {
    issueService.zhissueevents(501).then(function (data) {
    console.log("length should be "+$scope.codepipeline.length);
    for(var j=0;j<data.length;j++){
    $scope.issue_info.push(data[j].type);
    }
    if(i<$scope.codepipeline.length){i++;}
    }).then(function () {
       if(i<$scope.codepipeline.length){
       collectIE(i);
       }
    });
};

//google.charts.setOnLoadCallback(codestalematerial);
google.charts.setOnLoadCallback(codestale);
google.charts.setOnLoadCallback(teststale);

/*function codestalematerial(){
    //initialize the chart
    var gdata = new google.visualization.DataTable();
    gdata.addColumn('datetime','Days');
    gdata.addColumn('number','?');
    gdata.addColumn({type: 'number', role: 'tooltip'});
    var options = {
        title: 'Time in Code Review',
        vAxis:{
                 baselineColor: '#fff',
                 gridlineColor: '#fff',
                 textPosition: 'none'
               },
        legend: { position: 'none' },
        width: 500,
    };
    var chart = new google.visualization.ScatterChart(document.getElementById('codestalehistmaterial'));
    //get the issues in a particular pipeline
    issueService.zhboard().then(function (data) {
        console.log("the pipeline is "+data.pipelines[9].name);
        for(var i=0;i<data.pipelines[9].issues.length;i++){
        $scope.codepipeline.push(data.pipelines[9].issues[i]);
        }
//        console.log(data.pipelines[9].name+" has "+data.pipelines[9].issues.length+" issues");
    }).then(function() {
            for(var i=0;i<$scope.codepipeline.length;i++){
            issueService.zhissueevents($scope.codepipeline[i].issue_number).then(function (data) {
//            console.log(JSON.stringify(data));
//            console.log(data[data.length-1].issue);
                    for(var i=0;i<data.length;i++){
                    if(data[i].type=="transferIssue"){
                    if(data[i].to_pipeline.name=="Code Review"){
//                    console.log(JSON.stringify(data[i].created_at));
                    console.log(data[data.length-1].issue);
                    gdata.addRows([[new Date(data[i].created_at),0,data[data.length-1].issue]]);
                    }}}


                    chart.draw(gdata,google.charts.Scatter.convertOptions(options));
                    });
            }
            });

    };*/

$scope.oneDay = 24*60*60*1000;
$scope.averagedays=[];
$scope.averagedaystesting=[];
$scope.codereviewdays=0;
function codestale(){
    //initialize the chart
    var gdata = new google.visualization.DataTable();
    gdata.addColumn({type: 'string', id: 'Issue'});
    gdata.addColumn({type: 'datetime', id:'Start'});
    gdata.addColumn({type: 'datetime', id:'Today'});
    var options = {
        title: 'Time in Code Review',
//        legend: { position: 'none' },
        width: 500,
        height: 400
    };
    var chart = new google.visualization.Timeline(document.getElementById('codestalehist'));
    //get the issues in a particular pipeline
    issueService.zhboard().then(function (data) {
//        console.log("the pipeline is "+data.pipelines[9].name);
        for(var i=0;i<data.pipelines[9].issues.length;i++){
        $scope.codepipeline.push(data.pipelines[9].issues[i]);
        }
//        console.log(data.pipelines[9].name+" has "+data.pipelines[9].issues.length+" issues");
    }).then(function() {
    var issuetostring;
            for(var i=0;i<$scope.codepipeline.length;i++){
            issueService.zhissueevents($scope.codepipeline[i].issue_number).then(function (data) {
            var today = new Date();
//            console.log(JSON.stringify(data));
//            console.log(data[data.length-1].issue);
                    for(var i=0;i<data.length;i++){
                    if(data[i].type=="transferIssue"){
                    if(data[i].to_pipeline.name=="Code Review"){
//                    console.log(JSON.stringify(data[i].created_at));
//                    console.log(data[data.length-1].issue);
                    issuetostring=data[data.length-1].issue;
                    var yesterday = new Date(data[i].created_at);
                    var timeWait = Math.round((today - yesterday)/$scope.oneDay);
                    $scope.averagedays.push(timeWait);
//                    console.log($scope.averagedays);
                    gdata.addRows([[issuetostring.toString(),new Date(data[i].created_at),new Date(Date())]]);
                    }}}

                    var total=0;
                    for(var i=0;i<$scope.averagedays.length;i++){
                        total = total+$scope.averagedays[i];
                    }
                    $scope.averagedays.codereview = Math.round((total/$scope.averagedays.length));
                    chart.draw(gdata,options);

                    });

            }
            }

            )

    };

function teststale(){
    //initialize the chart
    var gdataT = new google.visualization.DataTable();
    gdataT.addColumn({type: 'string', id: 'Issue'});
    gdataT.addColumn({type: 'datetime', id:'Start'});
    gdataT.addColumn({type: 'datetime', id:'Today'});
    var options = {
        title: 'Time in Code Review',
//        legend: { position: 'none' },
        width: 500,
        height: 400
    };
    var chart = new google.visualization.Timeline(document.getElementById('teststalehist'));
    //get the issues in a particular pipeline
    issueService.zhboard().then(function (data) {
        console.log("the pipeline is "+data.pipelines[10].name);
        for(var i=0;i<data.pipelines[10].issues.length;i++){
        $scope.testpipeline.push(data.pipelines[10].issues[i]);
        }
//        console.log(data.pipelines[9].name+" has "+data.pipelines[9].issues.length+" issues");
    }).then(function() {
    var issuetostring;
            console.log($scope.testpipeline.length+" is the # in testing");
            for(var i=0;i<$scope.testpipeline.length;i++){
//            console.log("looking at #"+i+" which is issue "+$scope.testpipeline[i].issue_number);
            issueService.zhissueevents($scope.testpipeline[i].issue_number).then(function (data) {
            var today = new Date();
//            console.log("There are "+data[data.length-1].issue+" events for this issue");
//            console.log(JSON.stringify(data));
                    var addData = false;
                    for(var i=0;i<data.length-1;i++){
                    addData=false;
                    issuetostring=data[data.length-1].issue;
                    if(data.length==2){
                    addData=true;
                    console.log(issuetostring+" data length 2 fired and addData is "+addData);
                    console.log(data[i].created_at+" does created data register?");
                    }
                    if(data[i].type=="transferIssue"){
                    if(data[i].to_pipeline.name=="Testing"){
                    addData=true;
                    }}


                    var yesterday = new Date(data[i].created_at);
                    var timeWait = Math.round((today - yesterday)/$scope.oneDay);

                    if(addData){
                    $scope.averagedaystesting.push(timeWait);
//                    console.log($scope.averagedays);
                    gdataT.addRows([[issuetostring.toString(),new Date(data[i].created_at),new Date(Date())]]);
                    i=data.length;
                    }


                    }

                    var total=0;
                    for(var j=0;j<$scope.averagedaystesting.length;j++){
                        total = total+$scope.averagedaystesting[j];
                    }
                    $scope.averagedaystesting.testreview = Math.round((total/$scope.averagedaystesting.length));
//                    console.log($scope.averagedaystesting.testreview+" total is currently");
                    chart.draw(gdataT,options);
//                    console.log("at this time gdataT is "+gdataT.length+" long");
                    });

            }
            }

            )

    };


//function callback(){
    //Graph the process control chart
//    google.charts.setOnLoadCallback(codepcc);
//    };
//        var gdata = new google.visualization.DataTable();
//        gdata.addColumn('number','Issue');
//        gdata.addColumn('number','Days');
//        console.log(JSON.stringify($scope.codepipeline));
//        var chart = new google.visualization.Histogram(document.getElementById('codestalehist'));

/*
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
            title: 'Process Control Diagram 2',
            subtitle: 'Testing'
          },
          hAxis: {title: 'Date'},
          vAxis: {title: 'Days'}
        };

        var chart = new google.charts.Scatter(document.getElementById('scatterchart_material'));

        chart.draw(data, google.charts.Scatter.convertOptions(options));
};

*/

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

    this.zhissuedata = function(issue_number){

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

        }, function (error, status) {console.log('zhissuedata totally errored b/c of '+status);

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

    this.zhissueevents = function(issue_number){

            var dataUrl = "http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/issues/";
            var at = 'ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad';

            // Simple GET request example :
            return $http({
                method: 'GET',
                dataType: "json",
                url: dataUrl+issue_number+"/events?access_token="+at
            })
//            .then( function(data, status, headers, config) {
            .then( function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
//                console.log(issue_number+ " issue_number");
                data.data.push({"issue":issue_number});
                return data.data;

            }, function (error,status) {console.log('zhissueevents totally errored because of '+status);

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }
    this.zhboard = function(){

            var dataUrl = "http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/board";
            var at = 'ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad';

            // Simple GET request example :
            return $http({
                method: 'GET',
                dataType: "json",
                url: dataUrl+"?access_token="+at
            })
            .then( function(data, status, headers, config) {

                // this callback will be called asynchronously
                // when the response is available

                return data.data;

            }, function (error) {console.log('zhboard totally errored');

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
});

zhsApp.service('dataService', function($http) {
//    delete $http.defaults.headers.common['X-Requested-With'];
  var dataUrl = "http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/board";
              var at = 'ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad';


    this.getData = function() {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            method: 'GET',
            url: dataUrl+"?access_token="+at
//            params: 'limit=10, sort_by=created:desc',
//            headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
         });
     }
});