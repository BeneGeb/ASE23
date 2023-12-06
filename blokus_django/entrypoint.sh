#!/bin/sh

python mange.py makemigrations
python mange.py migrate --no-input
python mange.py collectstatic --no-input

gunicorn blokus_django.wsgi:application --bind 0.0.0.0:8000
```