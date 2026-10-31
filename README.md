# Jelly-tube

## Setup

1. `.env` を作り、空の値を埋める。`SECRET_KEY_BASE` は `openssl rand -hex 64` などで生成する

   ```
   cp .env.template .env
   ```

2. run server

   ```
   docker compose up -d --build
   ```

## 動画の配置

`.env` の `VIDEOS_DIR` に指定したディレクトリの `<タイトル>/source.<拡張子>` に動画を置くと、そのタイトルで一覧に出る。サムネイルは同じディレクトリに `thumbnail.<拡張子>` で置く。ストリーミング再生するには、動画一覧の Convert を押す。

## Enabled SSL

### use self-signed certificate

```bash
mkdir .certs
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout .certs/server.key -out .certs/server.crt
```

## development

### Setup

1. db と redis を起動

   ```
   docker compose up -d db redis
   ```

2. backend の `.env` を作る。`DB_PASSWORD` は、ルートの `.env` の `DB_ROOT_PASSWORD` と同じ値にする

   ```
   cp backend/.env.template backend/.env
   ```

3. backend と frontend を起動

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
