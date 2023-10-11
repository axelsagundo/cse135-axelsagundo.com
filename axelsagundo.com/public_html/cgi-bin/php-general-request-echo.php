<html>
  <head>
    <title>General Echo Rquest!</title>
  </head>
  <body>
    <h1>General Echo Request</h1>

    <p><?php
        echo 'Method: ' . htmlspecialchars($_SERVER['REQUEST_METHOD']        ) . '!';
        $request_body = file_get_contents('php://input/');
        echo "<br>";
        echo 'Data: ' . $_REQUEST['name'];
        ?></p>
  </body>
</html>