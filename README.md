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

2. run server

   ```
   cd docker
   docker-compose up -d
   ```

## 動画の配置

`backend/public/videos/<タイトル>/source.<拡張子>` に動画を置くと、そのタイトルで一覧に出る。サムネイルは同じディレクトリに `thumbnail.<拡張子>` で置く。ストリーミング再生するには、動画一覧の Convert を押す。

## Enabled SSL

### use self-signed certificate

```bash
mkdir .certs
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout .certs/server.key -out .certs/server.crt
```

## development

### Setup

1. redis を起動

   ```
   cd docker
   docker-compose up -d redis
   ```

2. backend と frontend を起動

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
