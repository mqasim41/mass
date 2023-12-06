FROM python:3.9-slim

WORKDIR /app

COPY requirements_webapp.txt .

RUN pip install --no-cache-dir -r requirements_webapp.txt

COPY app.py .

CMD ["python", "app.py"]
