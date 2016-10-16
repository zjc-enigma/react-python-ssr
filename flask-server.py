# -*- coding: utf-8 -*-
import os
from os import listdir
import sys
reload(sys)
sys.setdefaultencoding('UTF8')

from flask import Flask
from flask_bootstrap import Bootstrap
#from flask.ext.sqlalchemy import SQLAlchemy
from flask import render_template, redirect
from flask import send_from_directory, request, Response
import re


app = Flask(__name__, static_folder="static", template_folder="templates")



@app.route('/')
def index():
    return render_template('hello.html')



if __name__ == "__main__":
    app.run(debug=True, port=9898, host="0.0.0.0")
