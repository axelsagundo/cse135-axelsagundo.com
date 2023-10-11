#!/usr/bin/env python

import cgi
import os
import sys
import json
import cgitb;cgitb.enable()
from datetime import datetime

title = "Hello, Python!"
heading = "Hello, Python!"
message = "This page was generated with the Python programming language"
date = datetime.now()
ip_address = os.environ["REMOTE_ADDR"]


json_input_data = {
    "title" : title,
    "heading": heading,
    "message" : message,
    "date": str(date),
    "ip_address" : ip_address
}

json_object = json.dumps(json_input_data) 



print("Content-Type: application/json \r\n")

print(json_object)

