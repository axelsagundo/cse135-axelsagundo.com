#!/usr/bin/php
<html>
  <head>
    <title>Hello, World!</title>
  </head>
  <body>
    <p><?php echo "Issac was here, Hello, PHP World! "; 
             echo "<br>";
             echo "The time is " . date("Y-m-d") . " " . date("h:i:sa");
             echo "<br>";
             echo 'User IP Address - '.$_SERVER['REMOTE_ADDR'];  ?></p>
  </body>
</html>