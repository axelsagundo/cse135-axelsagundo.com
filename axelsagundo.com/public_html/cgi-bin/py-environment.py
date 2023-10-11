#!/usr/bin/env python

import cgi
import os
import sys
import cgitb;cgitb.enable()

print("Content-Type: text/html \r\n")
print("<style> h1 {text-align:center;} </style>")
print("<html>")
print("<head><title> Python Environment </title></head>")
print("<body>")

print ("<h1>Environment Variables</h1><hr>")
# print ("<p>This page was generated with the Python programming langauge</p>")

print ("<ul>")

for param in os.environ.keys():
   print "<li>%20s: %s </li>" % (param, os.environ[param])

print ("</ul>")

print("</body>")
print("</html>")
