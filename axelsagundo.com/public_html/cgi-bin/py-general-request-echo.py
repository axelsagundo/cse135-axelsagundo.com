#!/usr/bin/env python

import cgi
import sys
import os
import cgitb;cgitb.enable()

# content_len = int(os.environ["CONTENT_LENGTH"])
content_len = int(os.environ.get("CONTENT_LENGTH", 0))
post_content = sys.stdin.read(content_len)

pc_dict = {}

if (content_len != 0):

    q_l = post_content.split("&")
    for elem in q_l:
        k, v = elem.split("=")
        pc_dict[k] = v

query_string = os.environ.get('QUERY_STRING',0)

http_protocol = os.environ["SERVER_PROTOCOL"]
http_method = os.environ["REQUEST_METHOD"]

print("Content-Type: text/html \r\n")

print("<style> h1 {text-align:center;} </style>")
print("<html>")
print("<head><title>General Request Echo</title></head>")
print("<body>")

print ("<h1> General Request Echo </h1><hr>")

print ("<p><b>HTTP Protocol:</b>  {} </p>".format(http_protocol))
print ("<p><b>HTTP Method:</b>  {}</p>".format(http_method))

print("<p> <b> Query String:</b> {}</p>".format(query_string))

print("<p> <b>Message Body: </b> </p>")
print ("<ul>")

if (pc_dict.items() != None):
    for key, value in pc_dict.items():
        print("<li><b>{}</b>: {}</li>".format(key, value))

print ("</ul>")

print("</body>")
print("</html>")


