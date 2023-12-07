From python:3.10

ENV PYTHONBUFFERED=1

WORKDIR /blokus_django

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000