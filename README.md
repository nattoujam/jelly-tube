# Jelly-tube
## Enabled SSL
### use self-signed certificate
```bash
mkdir .certs
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout .certs/server.key -out .certs/server.crt
```
