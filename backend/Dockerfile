FROM python:3.8-slim-buster

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt

WORKDIR /app/src
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]