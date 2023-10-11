#!/usr/bin/env python

import cgi
import sys
import os
import cgitb;cgitb.enable()
import time, Cookie


cookie = os.environ.get('HTTP_COOKIE')

print("Content-Type: text/html \r\n")

print("<html>")
print("<head><title>Python Sessions</title></head>")
print("<body>")
print ("<h1> Python Sessions Page 2</h1><hr>")
print ("<table>")

if (cookie != None and ("destroyed" not in cookie)):
    
    print("<tr><td>Cookie:</td><td>{}</td></tr>".format(cookie))
else:
    print("<tr><td>Cookie:</td><td> None </td></tr>")

print ("</table>")

print("<br>")
print("<a href=\"/cgi-bin/py-sessions-1.py\">Session Page 1</a>")
print("<br>")
print("<a href=\"/py-cgiform.html\">C CGI Form</a>")
print("<br>")

print("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

print("</body>")
print("</html>")



