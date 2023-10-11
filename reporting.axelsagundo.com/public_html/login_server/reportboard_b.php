<!DOCTYPE html>
<html>
 
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
  <title>ZingGrid: Blank Grid</title>
  <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
  <style>
    html,
    body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
 
    .chart--container {
      height: 100%;
      width: 100%;
      min-height: 150px;
    }
 
    .zc-ref {
      display: none;
    }
  </style>
</head>
 
<body>
    <?php
        /* Open connection to HW23 MySQL database. */
        $mysqli = new mysqli("127.0.0.1", "issac", "issac123", "HW3");

        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        }
        /* Fetch result set from Performance table */
        $data=mysqli_query($mysqli, "SELECT * FROM Performance");   
    ?>

    <script>
      //For this one I was trying to compare time duration on webpage to loadtime
      //Currently not working because enterpage and exitpage are not in seconds which makes arithmetic hard
      //If you can compare other two datapoints better, do it please. Hopefully i can come back and fix it

      //var myData = [];
      //var myLabels = [];

      
      //Selects a specific Column ($info[ 'LoadTime' ]) from table
      Load=[<?php
      while($info=mysqli_fetch_array($data))
          echo $info[ 'LoadTime' ].','; 
      ?>];


      //anytime you want to get data from mySQl, you can essentially copy and past this, just change certain parameters to ensure you are
      //parameters to ensure you are extracting the correct data

      //start of copy paste template
      <?php
      $data=mysqli_query($mysqli, "SELECT * FROM Performance");
      ?>
      myLabels=[<?php
      while($info=mysqli_fetch_array($data))
          echo '"'.$info[ 'SessionID' ].'",'; 
      ?>];

      //end of copy paste template
      var x = [];

      <?php
      $data=mysqli_query($mysqli, "SELECT * FROM Static");
      ?>
      var SH=[<?php
      while($info=mysqli_fetch_array($data))
          echo '"'.$info[ 'ScreenH' ].'",'; 
      ?>];

      <?php
      $data=mysqli_query($mysqli, "SELECT * FROM Static");
      ?>
      var SW=[<?php
      while($info=mysqli_fetch_array($data))
          echo '"'.$info[ 'ScreenW' ].'",';
      ?>];
/*
      x = ext.map(function(item, index) {
      return item - ent[index];
      })    
*/
var RepTime = [];
/*

      for (let i = 0; i < res.length; i++) {
        RepTime.push(res[res[i].indexOf("responseEnd") + 15] - res[res[i].indexOf("responseStart") + 17] );
      }
      */

      var Screen = [0,0,0];
      for (let i = 0; i < SW.length; i++) {
        if(SW[i] == '1512' && SH[i] == '982'){
          Screen[0] += 1;
        }
        if(SW[i] == '1920' && SH[i] == '1080'){
          Screen[1] += 1;
        }
        if(SW[i] == '1470' && SH[i] == '956'){
          Screen[2] += 1;
        }
      } 


    </script>

    <div id="myChart" class="chart--container">
        <a class="zc-ref" href="https://www.zingchart.com">Powered by ZingChart</a>
    </div>
    <div id="myPie" class= "chart--container"></div>
    <div id="myLine" class= "chart--container"></div>
    <script>
      //id refers to the chart displayed by <div>
      //series and values is where you insert the data
        window.addEventListener('load', () => {
            zingchart.render({
                id: 'myChart',
                //data: "https://axelsagundo.com/api/performance",
                height: '100%',
                width: '100%',
                data: {
                  type: 'bar',
                  title: {
                    text: "Load Times For Webpages in milliseconds"
                  },
                  'scale-x': {
                    labels: myLabels
                  },
                  series: [{
                    values: RepTime
                  },
                  {
                    values: Load
                  },]
                }
            }); 
        });
        zingchart.render({
                id: 'myPie',
                //data: "https://axelsagundo.com/api/performance",
                height: '100%',
                width: '100%',
                data: {
                  type: 'pie',
                  "legend": {
                  },
                  title: {
                    text: "Screen Dimensions Of User (WxH in pixels)"
                  },
                  series: [{
                    values: [Screen[0]],
                    text: "1512x982"
                  },
                  {
                    values: [Screen[1]],
                    text: "1920x1080"
                  },
                  {
                    values: [Screen[2]],
                    text: "1536x864"
                  }
                ]
                }
            }); 

            zingchart.render({
                id: 'myLine',
                //data: "https://axelsagundo.com/api/performance",
                height: '100%',
                width: '100%',
                data: {
                  type: 'line',
                  title: {
                    text: "3 line chart"
                  },
                  series: [{
                    values: [4,8,1]
                  },
                  {
                    values: [6,2,4]
                  },
                  {
                    values: [5,6,9]
                  }
                ]
                }
            }); 
    </script>
    <button type="button" onclick="window.location='metricname.php';">Generate Report</button>
    <button type="button" onclick="window.location='../logout.html';">Log out</button>
</body>

</html>