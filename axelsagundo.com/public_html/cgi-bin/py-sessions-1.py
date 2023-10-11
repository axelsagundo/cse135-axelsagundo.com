#!/usr/bin/env python

import cgi
import sys
import os
import cgitb;cgitb.enable()
import time, Cookie


req_info = cgi.FieldStorage()

usr = req_info.getvalue('name')

cookie = os.environ.get('HTTP_COOKIE')

if (usr != None and len(usr) > 0):
    print("Content-Type: text/html")
    print("Set-Cookie: {}\r\n".format(usr))
  
else:
    print("Content-Type: text/html \r\n")

print("<html>")
print("<head><title>Python Sessions</title></head>")
print("<body>")
print ("<h1> Python Sessions Page 1</h1><hr>")
print ("<table>")

if (usr != None and len(usr) > 0):
    print("<tr><td>Cookie:</td><td>{}</td></tr>".format(usr))
elif (cookie != None and ("destroyed" not in cookie)):
    print("<tr><td>Cookie:</td><td>{}</td></tr>".format(cookie))
else:
    print("<tr><td>Cookie:</td><td> None </td></tr>")

print ("</table>")
print("<br>")
print("<a href=\"/cgi-bin/py-sessions-2.py\">Session Page 2</a>")
print("<br>")
print("<a href=\"/py-cgiform.html\">C CGI Form</a>")
print("<br>")

print("<form action=\"/cgi-bin/py-destroy-session.py\" method=\"get\">")
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

print("</body>")
print("</html>")


