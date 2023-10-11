<html>
  <head>
    <title>Enviormental Variables!</title>
  </head>
  <body>
    <p><?php
    echo "<h1>Enviormental Vars</h1>";
    foreach($_SERVER as $key => $item) {
    echo  $key . "=>".  $item . "</br>";
    }?></p>
  </body>
</html>