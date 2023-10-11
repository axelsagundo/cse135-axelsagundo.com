<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.zinggrid.com/dev/zinggrid-dev.min.js"></script>
    <script src="https://cdn.zinggrid.com/zinggrid.min.js" defer></script>
    <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
    
    <title>Metrics</title>
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
 

  </style>
</head>
<body>

    <h1>How would loading times affect user time on page</h1>
    <?php
        /* Open connection to HW23 MySQL database. */
        $mysqli = new mysqli("127.0.0.1", "issac", "issac123", "HW3");

        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        }  
    ?>

    <script>
    <?php
        $mydata = []; 
        $enter = []; 
        $exit = []; 
        $load = [];
        

        if ($result = $mysqli->query("SELECT SessionID, pageEnter, PageExit FROM Activity")) {
        $mydata = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        }
        if ($result = $mysqli->query("SELECT pageEnter FROM Activity")) {
            $enter = $result->fetch_all(MYSQLI_ASSOC);
            $result->close();
            }
        if ($result = $mysqli->query("SELECT PageExit FROM Activity")) {
        $exit = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        }
        if ($result = $mysqli->query("SELECT LoadTime FROM Performance")) {
          $load = $result->fetch_all(MYSQLI_ASSOC);
          $result->close();
          }
        
    ?>
    </script>

    <script>
    var dataValues = <?php echo json_encode($mydata) ?>;
    var enter = <?php echo json_encode($enter) ?>;
    var exit = <?php echo json_encode($exit) ?>;
    var load = <?php echo json_encode($load) ?>;
    var arr = [];
    var loadarr = [];
    var lab = [];
    <?php
      $mysqli->close();
    ?>

    for(var i = 0; i < dataValues.length; i++){
        if(dataValues[i].PageExit != '' && dataValues[i].PageExit != null){
            arr.push((new Date(dataValues[i].PageExit)).getTime()-(new Date(dataValues[i].pageEnter)).getTime());
            //document.write(load[i].LoadTime);
            loadarr.push(load[i].LoadTime);
            lab.push(dataValues[i].SessionID);
        }

    }
    //document.write(loadarr);
    
    </script>
    <script>
    window.onload = function() {
        document.querySelector('zing-grid').data = dataValues;
        zingchart.render({
                id: 'myLine',
                //data: "https://axelsagundo.com/api/performance",
                height: '100%',
                width: '100%',
                data: {
                  type: 'bar',
                  title: {
                    text: "Time spent on website in miliseconds"
                  },
                  series: [{
                    values: arr
                  }]
                }
            }); 
            zingchart.render({
                id: 'myLine2',
                //data: "https://axelsagundo.com/api/performance",
                height: '100%',
                width: '100%',
                data: {
                  type: 'bar',
                  title: {
                    text: "Loadtime for websites in miliseconds"
                  },
                  series: [{
                    values: loadarr
                  }]
                }
            }); 
    }
    </script>
    <zing-grid editor>
    </zing-grid>
    <div id="myLine" class= "chart--container"></div>
    <div id="myLine2" class= "chart--container"></div>
    <h2>Discussion</h2>
    <p>It seems like the time it takes to load a website only has a small effect on how long the user would
      stay on the webpage. It seems like the user time on the website is not determined on how long it takes
      for the page to load looking at the data. 
    </p>
    
</body>
</html>