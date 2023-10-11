<html>
  <head>
    <title>Session 1!</title>
  </head>
  <body>
    <h1>Session 1</h1>

    <p><?php
        session_start();
        if("" != trim($_POST['username'])){
            $_SESSION['username'] = $_POST['username'];
        }
        echo 'Name: ' . $_SESSION['username'];
        ?></p>
    <a href="php-sessions-2.php">Session 2 </br></a>
    <a href="/../php-cgiform.html">PHP CGI Form</a>
    <form style="margin-top:30px" action="php-destroy-session.php" method="get">
    <button type="submit\">Destroy Session</button>
    </form>
  </body>
</html>