#!/bin/bash
exec gunicorn wsgi --bind 0.0.0.0:5000 --workers 2 --reload --timeout 120
