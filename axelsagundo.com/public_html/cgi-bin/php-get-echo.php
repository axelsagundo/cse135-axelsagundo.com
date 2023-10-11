<html>
  <head>
    <title>Get Echo Request!</title>
  </head>
  <body>
    <h1>Get Echo Request</h1>
    <p><?php
        echo 'Hello ' . htmlspecialchars($_GET["name"]) . '!';
?></p>
  </body>
</html>