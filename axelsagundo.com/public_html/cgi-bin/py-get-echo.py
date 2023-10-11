#!/usr/bin/env python

# https://issacnavarro.online/cgi-bin/py-get-echo.py
# https://issacnavarro.online/cgi-bin/py-post-echo.py
# https://issacnavarro.online/cgi-bin/py-general-request-echo.py

import cgi
import os
import sys
import cgitb;cgitb.enable()

query_string = os.environ.get('QUERY_STRING')

q_dict = {}

if (query_string != None and len(query_string) > 0):
    q_l = query_string.split("&")
    for elem in q_l:
        k, v = elem.split("=")
        q_dict[k] = v

print("Content-Type: text/html \r\n")

print("<style> h1 {text-align:center;} </style>")
print("<html>")
print("<head><title>GET Request Echo</title></head>")
print("<body>")




print ("<h1> GET Request Echo </h1><hr>")

print("<p> <b> Raw Query String:</b> {}</p>".format(query_string))
print("<p> Formatted Query String: </p>")
print ("<ul>")
if (query_string != None and len(query_string) > 0):
    for key, value in q_dict.items():
        print("<li><b>{}</b>: {}</li>".format(key, value))

print ("</ul>")

print("</body>")
print("</html>")










