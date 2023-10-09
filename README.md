# Jelly-tube
## Setup
1. setup backend
```
# copy env file
cp config/env_backend_template.yml config/env_backend.yml
```

2. setup minio
```
# copy .env
cp docker/.env_template docker/.env

# type password
vim docker/.env
```

3. run server
```
cd docker
docker-compose up -d
```

4. create minio access key

5. type access key
```
vim config/env_backend.yml
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
