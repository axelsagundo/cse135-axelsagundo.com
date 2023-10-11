<html>
  <head>
    <title>Session 2!</title>
  </head>
  <body>
    <h1>Session 2</h1>

    <p><?php
        session_start();
        echo 'Name: ' . $_SESSION['username'];
        ?></p>
    <a href="php-sessions-1.php">Session 1 </br></a>
    <a href="/../php-cgiform.html">PHP CGI Form</a>
    <form style="margin-top:30px" action="php-destroy-session.php" method="get">
    <button type="submit\">Destroy Session</button>
    </form>
  </body>
</html>