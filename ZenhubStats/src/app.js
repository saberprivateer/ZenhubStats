'use strict';

var zhsApp = angular.module('zhsApp', ['ngMaterial'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('yellow'); })
    .run(function($log){
        $log.debug("zhsApp is ready!");
        })
    .config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

zhsApp.controller('zhsCtrl', function($q, $scope, $http, issueService, githubService){

      google.charts.load('current', {'packages':['corechart','scatter','timeline','table']});


$scope.onRepoChange = function(state) {
//                console.log(state);
             };

var req = {
  method: 'GET',
//  withCredentials: 'true',
  headers: 'X-Authentication-Token',
     url: 'https://api.zenhub.io/p1/repositories/60145876/board?access_token=ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad',
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
                                     stageVal=0;
                                     for(j=0;j<$scope.board.pipelines[i].issues.length;j++){
                                     if($scope.board.pipelines[i].issues[j].hasOwnProperty("estimate")){
                                     stageVal = stageVal + $scope.board.pipelines[i].issues[j].estimate.value;
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
                                                  stageVal=0;
                                                  for(j=0;j<$scope.board.pipelines[i].issues.length;j++){
                                                  if($scope.board.pipelines[i].issues[j].hasOwnProperty("estimate")){
                                                  stageVal = stageVal + $scope.board.pipelines[i].issues[j].estimate.value;
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

$scope.resources = [];
$scope.issue_hold;


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
//google.charts.setOnLoadCallback(codestale);
//google.charts.setOnLoadCallback(teststale);



function codestalematerial(){
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

    };

$scope.oneDay = 24*60*60*1000;
$scope.averagedays=[];
$scope.averagedaystesting=[];
$scope.codereviewdays=0;
$scope.clientlabel = "";
$scope.seekIssueNumber = 1;
$scope.averagedaysdesignreview=[];
$scope.averagedaysdesignspec=[];
$scope.averagedaysinprogress=[];

$scope.onStaleSubmit = function() {
codestale();
}

$scope.onStaleTestSubmit = function() {
teststale();
}

$scope.onDesignReview = function() {
designreview();
}

$scope.onDesignSpec = function() {
designspec();
}

$scope.onEIP = function() {
engineeringinprogress();
}

$scope.onSprint = function() {
//sprintgoals();
}

function engineeringinprogress(){
                  //initialize the chart
                  var gdata = new google.visualization.DataTable();
                  //Add labels
                  gdata.addColumn({type: 'string', id: 'Issue'});
                  gdata.addColumn({type: 'string', id: 'client'});
                  gdata.addColumn({type: 'datetime', id:'Start'});
                  gdata.addColumn({type: 'datetime', id:'Today'});

                  //Set chart options
                  var options = {
                      title: 'Time in Progress',
              //        timeline: {colorByRowLabel: true},
              //        timeline: {groupByRowLabel: false},
              //        legend: { position: 'none' },
                      width: 500,
                      height: 400
                  };

                  //Tell it where to show up in HTML
                  var chart = new google.visualization.Timeline(document.getElementById('progressgraph'));

                  //get the issues in a particular pipeline (should probably only call this once)
                  issueService
                      .zhboard()
                      .then(function (data)
                      {

                      var promises = [];

                      //Get the issue numbers in the pipeline
                      for(var i=0;i<data.pipelines[8].issues.length;i++)
                      {
                          var promise = githubService.issueGet($scope.user.key, data.pipelines[8].issues[i].issue_number);
                          promises.push(promise);
                      }

                      //Once all the issue data has been gathered, parse through it
                      $q.all(promises).then(function(data) {
                                  var data=[];
                                  for(var j=0;j<promises.length;j++){
                                  data=promises[j].$$state.value;
                                  $scope.seekIssueNumber = data.number;
//                                  $scope.clientlabel = "Needs Design";
                                  for(var i=0;i<data.labels.length;i++){
                                  if(data.labels[i].name=="android"){
                                  $scope.clientlabel = "android";
                                  }
                                  if(data.labels[i].name=="iOS"){
                                  $scope.clientlabel = "iOS";
                                  }
                                  if(data.labels[i].name=="services"){
                                  $scope.clientlabel = "services";
                                  }
                                  if(data.labels[i].name=="web"){
                                  $scope.clientlabel = "web";
                                  }
                                  if(data.labels[i].name=="Streaming Team"){
                                  $scope.clientlabel = "Streaming";
                                  }
                                  }
              //                    console.log(data.number+" has "+data.labels.length+" labels and is associated with "+$scope.clientlabel);

                                  //Find out when the issue came into the pipeline
                                  issueService.zhissueeventscodereview(data.number,$scope.clientlabel).then(function(data) {
                                                var issuetostring;
                                                var team;
                                                var today = new Date();
                                                        for(var i=0;i<data.length;i++){
                                                        if(data[i].type=="transferIssue"){
//                                                        console.log(data[i].to_pipeline.name);
                                                        if(data[i].to_pipeline.name=="Engineering In Progress"){
                                                        issuetostring=data[data.length-2].issue;
                                                        team=data[data.length-1].team;
                                                        var yesterday = new Date(data[i].created_at);
                                                        var timeWait = Math.round((today - yesterday)/$scope.oneDay);
                                                        $scope.averagedaysinprogress.push(timeWait);
                                                        gdata.addRows([[issuetostring.toString(),team,new Date(data[i].created_at),new Date(Date())]]);
                                                        }}}

                                                        var total=0;
                                                        for(var i=0;i<$scope.averagedaysinprogress.length;i++){
                                                            total = total+$scope.averagedaysinprogress[i];
                                                        }
                                                        $scope.averagedaysinprogress.inprogress = Math.round((total/$scope.averagedaysinprogress.length));
                                                        gdata.sort(2);
                                                        chart.draw(gdata,options);
                                                        }
                                                        );
                                  }
                          });
                          });
                          };

function designreview(){
                  //initialize the chart
                  var gdata = new google.visualization.DataTable();
                  //Add labels
                  gdata.addColumn({type: 'string', id: 'Issue'});
                  gdata.addColumn({type: 'string', id: 'client'});
                  gdata.addColumn({type: 'datetime', id:'Start'});
                  gdata.addColumn({type: 'datetime', id:'Today'});

                  //Set chart options
                  var options = {
                      title: 'Time in Code Review',
              //        timeline: {colorByRowLabel: true},
              //        timeline: {groupByRowLabel: false},
              //        legend: { position: 'none' },
                      width: 500,
                      height: 400
                  };

                  //Tell it where to show up in HTML
                  var chart = new google.visualization.Timeline(document.getElementById('designreview'));

                  //get the issues in a particular pipeline (should probably only call this once)
                  issueService
                      .zhboard()
                      .then(function (data)
                      {

                      var promises = [];

                      //Get the issue numbers in the pipeline
                      for(var i=0;i<data.pipelines[3].issues.length;i++)
                      {
                          var promise = githubService.issueGet($scope.user.key, data.pipelines[3].issues[i].issue_number);
                          promises.push(promise);
                      }

                      //Once all the issue data has been gathered, parse through it
                      $q.all(promises).then(function(data) {
                                  var data=[];
                                  for(var j=0;j<promises.length;j++){
                                  data=promises[j].$$state.value;
                                  $scope.seekIssueNumber = data.number;
                                  $scope.clientlabel = "Needs Design";
                                  /*for(var i=0;i<data.labels.length;i++){
                                  if(data.labels[i].name=="android"){
                                  $scope.clientlabel = "android";
                                  }
                                  if(data.labels[i].name=="iOS"){
                                  $scope.clientlabel = "iOS";
                                  }
                                  if(data.labels[i].name=="services"){
                                  $scope.clientlabel = "services";
                                  }
                                  if(data.labels[i].name=="web"){
                                  $scope.clientlabel = "web";
                                  }
                                  if(data.labels[i].name=="Streaming Team"){
                                  $scope.clientlabel = "Streaming";
                                  }
                                  }*/
              //                    console.log(data.number+" has "+data.labels.length+" labels and is associated with "+$scope.clientlabel);

                                  //Find out when the issue came into the pipeline
                                  issueService.zhissueeventscodereview(data.number,$scope.clientlabel).then(function(data) {
                                                var issuetostring;
                                                var team;
                                                var today = new Date();
                                                        for(var i=0;i<data.length;i++){
                                                        if(data[i].type=="transferIssue"){
                                                        if(data[i].to_pipeline.name=="Design Review"){
                                                        issuetostring=data[data.length-2].issue;
                                                        team=data[data.length-1].team;
                                                        var yesterday = new Date(data[i].created_at);
                                                        var timeWait = Math.round((today - yesterday)/$scope.oneDay);
                                                        $scope.averagedaysdesignreview.push(timeWait);
                                                        gdata.addRows([[issuetostring.toString(),team,new Date(data[i].created_at),new Date(Date())]]);
                                                        }}}

                                                        var total=0;
                                                        for(var i=0;i<$scope.averagedaysdesignreview.length;i++){
                                                            total = total+$scope.averagedaysdesignreview[i];
                                                        }
                                                        $scope.averagedaysdesignreview.designreview = Math.round((total/$scope.averagedaysdesignreview.length));
                                                        gdata.sort(2);
                                                        chart.draw(gdata,options);

                                                        }
                                                        );
                                  }
                          });
                          });
                          };

function designspec(){
    //initialize the chart
    var gdata = new google.visualization.DataTable();
    //Add labels
    gdata.addColumn({type: 'string', id: 'Issue'});
    gdata.addColumn({type: 'string', id: 'client'});
    gdata.addColumn({type: 'datetime', id:'Start'});
    gdata.addColumn({type: 'datetime', id:'Today'});

    //Set chart options
    var options = {
        title: 'Time in Code Review',
//        timeline: {colorByRowLabel: true},
//        timeline: {groupByRowLabel: false},
//        legend: { position: 'none' },
        width: 500,
        height: 400
    };

    //Tell it where to show up in HTML
    var chart = new google.visualization.Timeline(document.getElementById('designspec'));

    //get the issues in a particular pipeline (should probably only call this once)
    issueService
        .zhboard()
        .then(function (data)
        {

        var promises = [];

        //Get the issue numbers in the pipeline
        for(var i=0;i<data.pipelines[4].issues.length;i++)
        {
            var promise = githubService.issueGet($scope.user.key, data.pipelines[4].issues[i].issue_number);
            promises.push(promise);
        }

        //Once all the issue data has been gathered, parse through it
        $q.all(promises).then(function(data) {
                    var data=[];
                    for(var j=0;j<promises.length;j++){
                    data=promises[j].$$state.value;
                    $scope.seekIssueNumber = data.number;
                    $scope.clientlabel = "Needs Spec";
                    /*for(var i=0;i<data.labels.length;i++){
                    if(data.labels[i].name=="android"){
                    $scope.clientlabel = "android";
                    }
                    if(data.labels[i].name=="iOS"){
                    $scope.clientlabel = "iOS";
                    }
                    if(data.labels[i].name=="services"){
                    $scope.clientlabel = "services";
                    }
                    if(data.labels[i].name=="web"){
                    $scope.clientlabel = "web";
                    }
                    if(data.labels[i].name=="Streaming Team"){
                    $scope.clientlabel = "Streaming";
                    }
                    }*/
//                    console.log(data.number+" has "+data.labels.length+" labels and is associated with "+$scope.clientlabel);

                    //Find out when the issue came into the pipeline
                    issueService.zhissueeventscodereview(data.number,$scope.clientlabel).then(function(data) {
                                  var issuetostring;
                                  var team;
                                  var today = new Date();
                                          for(var i=0;i<data.length;i++){
                                          if(data[i].type=="transferIssue"){
                                          if(data[i].to_pipeline.name=="Design Spec"){
                                          issuetostring=data[data.length-2].issue;
                                          team=data[data.length-1].team;
                                          var yesterday = new Date(data[i].created_at);
                                          var timeWait = Math.round((today - yesterday)/$scope.oneDay);
                                          $scope.averagedaysdesignspec.push(timeWait);
                                          gdata.addRows([[issuetostring.toString(),team,new Date(data[i].created_at),new Date(Date())]]);
                                          }}}

                                          var total=0;
                                          for(var i=0;i<$scope.averagedaysdesignspec.length;i++){
                                              total = total+$scope.averagedaysdesignspec[i];
                                          }
                                          $scope.averagedaysdesignspec.designspec = Math.round((total/$scope.averagedaysdesignspec.length));
                                          gdata.sort(2);
                                          chart.draw(gdata,options);

                                          }
                                          );
                    }
            });
            });
            };

function codestale(){
    //initialize the chart
    var gdata = new google.visualization.DataTable();
    //Add labels
    gdata.addColumn({type: 'string', id: 'Issue'});
    gdata.addColumn({type: 'string', id: 'client'});
    gdata.addColumn({type: 'datetime', id:'Start'});
    gdata.addColumn({type: 'datetime', id:'Today'});

    //Set chart options
    var options = {
        title: 'Time in Code Review',
//        timeline: {colorByRowLabel: true},
//        timeline: {groupByRowLabel: false},
//        legend: { position: 'none' },
        width: 500,
        height: 400
    };

    //Tell it where to show up in HTML
    var chart = new google.visualization.Timeline(document.getElementById('codestalehist'));

    //get the issues in a particular pipeline (should probably only call this once)
    issueService
        .zhboard()
        .then(function (data)
        {

        var promises = [];

        //Get the issue numbers in the pipeline
        for(var i=0;i<data.pipelines[9].issues.length;i++)
        {
            var promise = githubService.issueGet($scope.user.key, data.pipelines[9].issues[i].issue_number);
            promises.push(promise);
        }

        //Once all the issue data has been gathered, parse through it
        $q.all(promises).then(function(data) {
                    var data=[];
                    for(var j=0;j<promises.length;j++){
                    data=promises[j].$$state.value;
                    $scope.seekIssueNumber = data.number;
                    for(var i=0;i<data.labels.length;i++){
                    if(data.labels[i].name=="android"){
                    $scope.clientlabel = "android";
                    }
                    if(data.labels[i].name=="iOS"){
                    $scope.clientlabel = "iOS";
                    }
                    if(data.labels[i].name=="services"){
                    $scope.clientlabel = "services";
                    }
                    if(data.labels[i].name=="web"){
                    $scope.clientlabel = "web";
                    }
                    if(data.labels[i].name=="Streaming Team"){
                    $scope.clientlabel = "Streaming";
                    }
                    }
//                    console.log(data.number+" has "+data.labels.length+" labels and is associated with "+$scope.clientlabel);

                    //Find out when the issue came into the pipeline
                    issueService.zhissueeventscodereview(data.number,$scope.clientlabel).then(function(data) {
                                  var issuetostring;
                                  var team;
                                  var today = new Date();
                                          for(var i=0;i<data.length;i++){
                                          if(data[i].type=="transferIssue"){
                                          if(data[i].to_pipeline.name=="Code Review"){
                                          issuetostring=data[data.length-2].issue;
                                          team=data[data.length-1].team;
                                          var yesterday = new Date(data[i].created_at);
                                          var timeWait = Math.round((today - yesterday)/$scope.oneDay);
                                          $scope.averagedays.push(timeWait);
                                          gdata.addRows([[issuetostring.toString(),team,new Date(data[i].created_at),new Date(Date())]]);
                                          }}}

                                          var total=0;
                                          for(var i=0;i<$scope.averagedays.length;i++){
                                              total = total+$scope.averagedays[i];
                                          }
                                          $scope.averagedays.codereview = Math.round((total/$scope.averagedays.length));
                                          gdata.sort(2);
                                          chart.draw(gdata,options);

                                          }
                                          );
                    }
            });
            });
            };

function teststale(){
    //initialize the chart
    var gdata = new google.visualization.DataTable();
    //Add labels
    gdata.addColumn({type: 'string', id: 'Issue'});
    gdata.addColumn({type: 'string', id: 'client'});
    gdata.addColumn({type: 'datetime', id:'Start'});
    gdata.addColumn({type: 'datetime', id:'Today'});

    //Set chart options
    var options = {
        title: 'Time in Testing',
//        timeline: {colorByRowLabel: true},
//        timeline: {groupByRowLabel: false},
//        legend: { position: 'none' },
        width: 500,
        height: 400
    };

    //Tell it where to show up in HTML
    var chart = new google.visualization.Timeline(document.getElementById('teststalehist'));

    //get the issues in a particular pipeline (should probably only call this once)
    issueService
        .zhboard()
        .then(function (data)
        {

        var promises = [];

        //Get the issue numbers in the pipeline
        for(var i=0;i<data.pipelines[10].issues.length;i++)
        {
            var promise = githubService.issueGet($scope.user.key, data.pipelines[10].issues[i].issue_number);
            promises.push(promise);
        }

        //Once all the issue data has been gathered, parse through it
        $q.all(promises).then(function(data) {
                    var data=[];
                    for(var j=0;j<promises.length;j++){
                    data=promises[j].$$state.value;
                    $scope.seekIssueNumber = data.number;
                    $scope.clientlabel = "Other";
                    for(var i=0;i<data.labels.length;i++){

                    if(data.labels[i].name=="android"){
                    $scope.clientlabel = "android";
                    }
                    if(data.labels[i].name=="iOS"){
                    $scope.clientlabel = "iOS";
                    }
                    if(data.labels[i].name=="services"){
                    $scope.clientlabel = "services";
                    }
                    if(data.labels[i].name=="web"){
                    $scope.clientlabel = "web";
                    }
                    if(data.labels[i].name=="Streaming Team"){
                    $scope.clientlabel = "Streaming";
                    console.log("Streaming!");
                    }
                    if(data.labels[i].name=="windows"){
                    $scope.clientlabel = "windows";
                    }
                    if(data.labels[i].name=="macOS"){
                    $scope.clientlabel = "macOS";
                    }
                    }
//                    console.log(data.number+" has "+data.labels.length+" labels and is associated with "+$scope.clientlabel);

                    //Find out when the issue came into the pipeline
                    issueService.zhissueeventscodereview(data.number,$scope.clientlabel).then(function(data) {
                                  var issuetostring;
                                  var team;
                                  var today = new Date();
                                  for(var i=0;i<data.length;i++){
                                         if(data[i].type=="transferIssue"){
                                         if(data[i].to_pipeline.name=="Testing"){
                                         issuetostring=data[data.length-2].issue;
                                         team=data[data.length-1].team;
                                         var yesterday = new Date(data[i].created_at);
                                         var timeWait = Math.round((today - yesterday)/$scope.oneDay);
                                         $scope.averagedaystesting.push(timeWait);
                                         gdata.addRows([[issuetostring.toString(),team,new Date(data[i].created_at),new Date(Date())]]);
                                         }}}

                                         var total=0;
                                         for(var i=0;i<$scope.averagedaystesting.length;i++){
                                             total = total+$scope.averagedaystesting[i];
                                         }
                                         $scope.averagedaystesting.testing = Math.round((total/$scope.averagedaystesting.length));
                                         gdata.sort(2);
                                         chart.draw(gdata,options);

                                         }
                                  );
                    }
            });
            });
            };

$scope.closedIssues=[];
$scope.numclosedIssues=[];
$scope.velBoard=[];

$scope.onSubmitKey = function() {
    //Setup the chart for this data
    var tdata = new google.visualization.DataTable();
    tdata.addColumn('number','Issue');
    tdata.addColumn('number','Week');
    tdata.addColumn('number','Estimate');
    var table = new google.visualization.Table(document.getElementById('table_div'));

    //How many issues are there?
    githubService.issueSearchHead($scope.user.key).then( function (data){
        $scope.numclosedIssues.push(data);
    }).then(function () {

        //Get a page of issues since estimation started
        for(var p=1;p<Math.round($scope.numclosedIssues/100)+1;p++){
//       for(var p=1;p<2;p++){
        console.log("Calling page "+p);
        githubService.issueSearch($scope.user.key,p).then( function (data){
            console.log("There are "+data.total_count+" issues found in this search");
            var team;
            var subteam;

            //For each issue
            for(var i=0;i<data.items.length;i++){
                team="Client/Viewer Team"
                subteam="N/A";
                   //Check the issues labels
                   for(var j=0;j<data.items[i].labels.length;j++){
                        if(data.items[i].labels[j].name=="Streaming Team"){
                        team="Streaming Team";
                        }
                        if(data.items[i].labels[j].name=="iOS"){
                        subteam="iOS";
                        }
                        if(data.items[i].labels[j].name=="web"){
                        subteam="web";
                        }
                        if(data.items[i].labels[j].name=="android"){
                        subteam="android";
                        }
                        if(data.items[i].labels[j].name=="windows"){
                        subteam="windows";
                        }
                        if(data.items[i].labels[j].name=="services"){
                        subteam="services";
                        }
                        if(data.items[i].labels[j].name=="macOS"){
                        subteam="macOS";
                   }
                }
                //Only add an issue if it is associated with a team
                if(subteam!=="N/A"){
                    $scope.closedIssues.push({
                    "issue" : data.items[i].number,
                    "team":team,
                    "subteam":subteam,
                    "closed_at": moment(data.items[i].closed_at),
//                    "estimate": idata.estimate.value
                    });
                }
                }

        //Sort issues based on the week they closed
        }).then( function() {
            var dd = "MMM Do";
            var today = moment();
            var then = moment("2016-06-26"); //the week we started estimation
            var weeks = today.week()-then.week()+1;
            console.log("today is "+today.format(dd)+" and its been "+weeks+" weeks since "+then.format(dd));
            for(var i=0;i<weeks;i++){
            //console.log("checking for week "+then.week());
                for(var j=0;j<$scope.closedIssues.length;j++){
                  if($scope.closedIssues[j].closed_at.isSame(then,'week')){
//                  tdata.addRows([
//                  [$scope.closedIssues[j].issue, $scope.closedIssues[j].closed_at.week(),0]
//                  ]);
//                  console.log("calling service for "+$scope.closedIssues[j].issue);
                    issueService.zhissuedata($scope.closedIssues[j].issue,$scope.closedIssues[j].closed_at.week(),j).then(function(data){
//                    console.log("issue "+data[0].issue+" "+JSON.stringify(data[0].data));
                        if(data[0].data.hasOwnProperty('estimate')){
                        console.log("I want to log the estimate "+data[0].data.estimate.value);
//                        tdata.setCell(
//                        data[0].index, 2, data[0].data.estimate.value
//                        );
                        tdata.addRows([
                        [data[0].issue, data[0].week, data[0].data.estimate.value]
                        ]);
                        table.draw(tdata);
                               // [data[0].issue, data[0].week, data[0].data.estimate]
                                //[$scope.closedIssues[j].issue, $scope.closedIssues[j].closed_at.week(), data.estimate]
                            //]);
                        }
                    });
                  }
                }
                then.add(1,'w');
            }


        }).then(function() {
            table.draw(tdata);
            console.log($scope.closedIssues.length);
        });
        }
    });
}
});


zhsApp.service('githubService', function ($q, $http){

    this.issueSearch = function(key,p){
        var dataUrl= "https://api.github.com/search/issues?q=repo:Mobcrush/Product-Development+closed:>2016-06-26&per_page=50";

        return $http({
            method: 'GET',
            dataType: "json",
            url: dataUrl+"&page="+p,
            headers: {"Authorization": "token "+key}
        }).then( function(data) {

//            console.log(data.headers('link'));
            var results = data.data;
//            console.log(results.total_count+" total issues");
            return data.data;

        });

    }

    this.issueSearchHead = function(key) {
        var dataUrl= "https://api.github.com/search/issues?q=repo:Mobcrush/Product-Development+closed:>2016-06-26&per_page=50";

        return $http({
            method: 'GET',
            dataType: "json",
            url: dataUrl,
            headers: {"Authorization": "token "+key}
        }).then( function(data) {

            var results = data.data;
            return results.total_count;

        });

    }

    this.issueGet = function(key,num) {
            var dataUrl= "https://api.github.com/repos/Mobcrush/Product-Development/issues/"+num;

            return $http({
                method: 'GET',
                dataType: "json",
                url: dataUrl,
                headers: {"Authorization": "token "+key}
            }).then( function(data) {

                var results = data.data;
                return results;

            });

        }

});

zhsApp.service('issueService', function ($q, $http) {

    this.zhissuedata = function(issue_number,week,j){

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
            //because rate limit sucks
            var start = new Date().getTime();
              for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > 1000){
                  break;
                }
              }
            var results = [];
            results.push({
            "data":data.data,
            "issue":issue_number,
            "week":week,
            "index":j
            });
//            results.data.push({"issue":issue_number});
//            data.data.push({"week":week});
//console.log(JSON.stringify(results));
//console.log("issue is "+results[0].issue);
            return results;

        }, function (error) {console.log('zhissuedata totally errored');

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
            .then( function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                //Janky way to pass the issue # with the payload. Should refactor the JSON
                data.data.push({"issue":issue_number});
                return data.data;

            }, function (error) {console.log('zhissueevents totally errored');

                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        }
    this.zhissueeventscodereview = function(issue_number,team){

                var dataUrl = "https://api.zenhub.io/p1/repositories/60145876/issues/";
                var at = 'ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad';

                // Simple GET request example :
                return $http({
                    method: 'GET',
                    dataType: "json",
                    headers: 'X-Authentication-Token',
                    url: dataUrl+issue_number+"/events?access_token="+at
                })
                .then( function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available

                    //Janky way to pass the issue # with the payload. Should refactor the JSON
                    data.data.push({"issue":issue_number});
                    data.data.push({"team":team});
                    return data.data;

                }, function (error) {console.log('zhissueevents totally errored');

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            }

    this.zhboard = function(){

//            var dataUrl = "http://cors.io/?u=https://api.zenhub.io/p1/repositories/60145876/board";
            var dataUrl = "https://api.zenhub.io/p1/repositories/60145876/board";
            var at = 'ba8dd91a4ab09a70684bea407238a515bd759f23d1180078289c68cb98da96dab988b15e7b59e7ad';

            // Simple GET request example :
            return $http({
                method: 'GET',
                dataType: "json",
//                withCredentials: "true",
                headers: 'X-Authentication-Token',
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