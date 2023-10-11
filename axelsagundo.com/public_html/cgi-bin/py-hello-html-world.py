#!/usr/bin/env python

import cgi
import os
import sys
import cgitb;cgitb.enable()
from datetime import datetime


date = datetime.now()
ip_address = os.environ["REMOTE_ADDR"]

print("Content-Type: text/html \r\n")

print("<html>")
print("<head><title>Hello, Python!</title></head>")
print("<body>")
print ("<h1>Axel was here - Hello, Python!</h1>")
print ("<p>This page was generated with the Python programming langauge</p>")

# for param in os.environ.keys():
#    print "<b>%20s</b>: %s <br>" % (param, os.environ[param])

print("<p>The current local time is: " + str(date) + "</p>")
print("<p>Your IP address: {}</p>".format(ip_address))

print("</body>")
print("</html>")