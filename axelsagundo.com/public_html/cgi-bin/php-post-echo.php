<html>
  <head>
    <title>POST Echo Rquest!</title>
  </head>
  <body>
    <h1>POST Echo Request</h1>

    <form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Name: <input type="text" name="name">
  <input type="submit">
</form>

    <p><?php
        echo 'Hello ' . htmlspecialchars($_POST["name"]) . '!';
        ?></p>
  </body>
</html>