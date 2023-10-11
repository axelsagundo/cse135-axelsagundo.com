<html>
  <head>
    <title>Destroyed Session!</title>
  </head>
  <body>
    <h1>Destroyed Session</h1>
    <p><?php
        session_start();
        session_destroy();
        ?></p>
    <a href="/../php-cgiform.html">PHP CGI Form </br></a>
    <a href="php-sessions-1.php">Session 1 </br></a>
    <a href="php-sessions-2.php">Session 2 </br></a>

  </body>
</html>