# Jelly-tube

## Setup

1. setup backend

   ```
   cp backend/.env.template backend/.env
   ```

   rails サーバー用の secret を生成し、backend/.env に追記する

   ```
   cd backend
   rails secret
   ```

2. setup minio

   ```
   cp docker/minio.env.template docker/minio.env
   ```

3. run server

   ```
   cd docker
   docker-compose up -d
   ```

4. create minio access key and user

5. type access key

   ```
   vim backend/.env
   ```

6. restart server

   ```
   cd docker
   docker-compose up -d
   ```

## Enabled SSL

### use self-signed certificate

```bash
mkdir .certs
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout .certs/server.key -out .certs/server.crt
```

## development

### Setup

1. minio と redis を起動

   ```
   cd docker
   docker-compose up -d minio redis
   ```

2. minio でユーザーと Access key を作成

- http://localhost:9000

3. secret の設定

   backend/.env に追記

   ```
   AWS_ACCESS_KEY_ID: [作成したAccess Key]
   AWS_SECRET_ACCESS_KEY: [作成したAccess KeyのSecret Key]
   ```

4. backend と frontend を起動

   ```
   # backend
   cd backend
   bundle exec rails s -p 4100

   # backend worker
   cd backend
   bundle exec sidekiq

   # frontend
   cd frontend
   npm run dev
   ```
