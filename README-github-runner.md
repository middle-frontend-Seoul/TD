## Установка и запуск github-runner на ВМ

https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners

https://docs.github.com/en/actions/hosting-your-own-runners/configuring-the-self-hosted-runner-application-as-a-service

## Запуск docker и docker-compose без sudo
sudo gpasswd -a $USER docker
sudo service docker restart

в папке ~/actions-runner
sudo ./svc.sh stop
sudo ./svc.sh start
