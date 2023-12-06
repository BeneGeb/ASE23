# From python:3.10
# RUN pip install --upgrade pip
# COPY ./requirements.txt .
# RUN pip install -r requirements.txt

# COPY . /app
# WORKDIR /app

# COPY ./entrypoint.sh .
# entrypoint ["sh", "/app/entrypoint.sh"]

From python:3.10

ENV PYTHONBUFFERED=1

WORKDIR /blokus_django

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000