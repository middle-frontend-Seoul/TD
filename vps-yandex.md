## Примерный список команд для выполнения на ВМ

### Устанавливаем недостающие пакеты
sudo apt-get update
sudo apt install git
sudo apt install unzip
curl -fsSL https://fnm.vercel.app/install | bash
source /home/seoul/.bashrc
fnm install v12.13.0
git clone https://github.com/middle-frontend-Seoul/TD.git
sudo apt install nginx
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
systemctl status nginx
sudo curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
docker -v
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

### Подтягиваем ветку с настройками nginx + копируем ssl certs
git pull
git checkout -t origin/ssl-confirm
npm i
npm run dev
mkdir ~/ssl_certs
exit
sudo cp -rf ~/ssl_certs /etc/ssl/ssl_certs

### Добавляем virtual host seoul-td
cd /etc/nginx/sites-available
sudo vim seoul-td (копируем содержимое из nginx/nginx.conf)
sudo ln -s /etc/nginx/sites-available/seoul-td /etc/nginx/sites-enabled/
sudo systemctl restart nginx
systemctl status nginx.service

### Запускаем фронтенд
cd ~/TD
npm install pm2 -g

### Запускаем бекенд
cd ~/TD/backend
sudo docker-compose up -d

## SSL certs
ssl certs заказываем на zerossl.com
сначала создаем папку ssl_certs на ВИ
затем копируем в нее:
(предварительно cat certificate.crt ca_bundle.crt >> certs/certificate.crt)

scp -i ~/.ssh/vash_id_rsa certificate.crt seoul@84.252.139.172:ssl_certs/certificate.crt
scp -i ~/.ssh/vash_id_rsa private.key seoul@84.252.139.172:ssl_certs/private.key
