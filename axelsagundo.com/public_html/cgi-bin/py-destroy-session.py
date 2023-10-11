#!/usr/bin/env python

import cgi
import sys
import os
import cgitb;cgitb.enable()
import time, Cookie


print("Set-Cookie: destroyed")
print("Content-Type: text/html \r\n")

print("<html>")
print("<head><title>Python Sessions Destroyed</title></head>")
print("<body>")
print ("<h1> Python Session Destroyed</h1><hr>")

print("<br>")
print("<a href=\"/cgi-bin/py-sessions-1.py\">Back to Page 1</a>")
print("<br>")
print("<a href=\"/cgi-bin/py-sessions-2.py\">Back to Page 2</a>")
print("<br>")
print("<a href=\"/py-cgiform.html\">C CGI Form</a>")
print("</body>")
print("</html>")
