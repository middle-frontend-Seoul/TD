## Установка и запуск github-runner на ВМ

https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners

https://docs.github.com/en/actions/hosting-your-own-runners/configuring-the-self-hosted-runner-application-as-a-service

в папке ~/actions-runner
sudo ./svc.sh install root
sudo ./svc.sh start

## Запуск docker и docker-compose без sudo
sudo gpasswd -a $USER docker
sudo service docker restart

## Прописать env переменные в settings/secrets на Github
PORT - внешний порт контейнера web. на него должен указывать nginx на ВМ

FRONT_REDIRECT_URI (REDIRECT_URI в .env)
FRONT_FORUM_API_URL (FORUM_API_URL в .env)

DB_FORCE_SYNC
DB_NAME
DB_PASSWORD
DB_PORT
DB_USER
