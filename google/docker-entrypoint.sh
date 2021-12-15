#!/usr/bin/env bash

# export PYTHONPATH=.

# sudo python3 api.py 6666

export FLASK_APP=app.py
export FLASK_ENV=development
flask run --host 0.0.0.0 --port 5555 --cert=adhoc
# flask run --host 0.0.0.0 --port 5555
# pythonw -m flask run --host 0.0.0.0 --port 5000 > log.txt 2>&1
# flask run --cert=adhoc
