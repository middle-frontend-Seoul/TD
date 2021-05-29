## Примерный список команд для выполнения на ВМ

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
cd /etc/nginx
sudo cp nginx.conf old_nginx.conf
sudo vim nginx.conf
sudo vim nginx.conf
sudo systemctl restart nginx
systemctl status nginx.service
git pull
git checkout -t origin/ssl-confirm
npm i
npm run dev
mkdir ~/ssl_certs
exit
sudo cp -rf ~/ssl_certs /etc/ssl/ssl_certs
sudo systemctl restart nginx
cd ~/TD
npm install pm2 -g

## SSL certs
ssl certs заказываем на zerossl.com
сначала создаем папку ssl_certs на ВИ
затем копируем в нее:
(предварительно cat certificate.crt ca_bundle.crt >> certs/certificate.crt)

scp -i ~/.ssh/vash_id_rsa certificate.crt seoul@84.252.139.172:ssl_certs/certificate.crt
scp -i ~/.ssh/vash_id_rsa private.key seoul@84.252.139.172:ssl_certs/private.key
