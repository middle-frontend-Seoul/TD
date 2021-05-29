# Tower Defense project

## Локальный запуск и разработка

Скопировать `.env.sample` в `.env` и указать нужные переменные окружения.

```
npm i
npm start
```

## сборка и запуск локально в докер контейнере

Скопировать `.env.sample` в `.env`
docker-compose build
docker-compose up -d
http://localhost:8086

Порт можно задать произвольный в `.env` файле.
Для этого задайте переменной `PORT` требуемое значение

## локальный запуск и разработка forum api (backend)

переходим в папку backend
Скопировать `.env.sample` в `.dev.env` и указать нужные переменные окружения.

docker-compose build
docker-compose up
http://localhost:7000

## Деплой на heroku:

heroku login
heroku container:login
heroku create my-app (название приложения - выполняется один раз)
heroku container:push web
heroku container:release web
heroku open // открываем приложение

## Ручной запуск в Яндекс.Облаке

список команд после создания ВМ (ubuntu 20.04) - файл vps-yandex.md
запускаем с помощью pm2
pm2 start npm --no-automation --name seoul-td -- run dev

pm2 logs
pm2 list
pm2 stop all
pm2 delete seoul-td

cd backend
docker-compose up -d

## Описание проекта:

Игра, представитель жанра "Tower Defense". Суть игры сводится к уничтожению волн наступающих противников, которые с каждым новым раундом становятся сильнее и многочисленнее. Устранение врагов происходит с помощью различных башен, которые игрок расставляет по уровню на свое усмотрение.

## Примеры реализаций:

- Canvas TD - https://canvas-td.teddy.io (https://github.com/tkazec/canvas-td)
- INERT - https://inert.now.sh (https://github.com/CorentinTh/inert)

## Макеты:

https://www.figma.com/file/24fCfLLYYrCyTPW4SULqI5/Tower-Defense?node-id=0%3A1

## Комментарии к макету:

На начальном экране (попадаем сразу после авторизации) - предусмотрена возможность выбора карты (в MVP будет показана только 1 карта)
По клику на карту - формируется экран с игровым полем и сразу начинается игра

Поле состоит из 2-х типов клеток:

![](https://sun9-17.userapi.com/impg/_HFIpEzWQCuml4iIJWSLATr_6OSi1egN__WTvg/JZNeUiW6Qw0.jpg?size=50x50&quality=96&sign=5b29ac9c1448691f037c9df4b9e37954&type=album) непроходимые участки, на которых можно располагать башни

![](https://sun9-59.userapi.com/impg/3hEiG0IBHkmFOca4GBvo8WywsImAmw0Itv7McQ/qN27RfvtMno.jpg?size=50x50&quality=96&sign=a75dc214379547840d2383703f15a655&type=album) путь, по которому движутся враги

Типы врагов:

![](https://sun9-32.userapi.com/impg/URlw08NTUhVhKvAheg0Q-KeOg48OudlLnFocIw/DX_Fm9sUI98.jpg?size=50x80&quality=96&sign=736f6006f71f5eba7783fb94085c4ee4&type=album) ![](https://sun9-64.userapi.com/impg/l7bGsP-Jx8Vfki37qwI60mQmdyBkKwo324y8fw/c99l9-_eSeo.jpg?size=50x80&quality=96&sign=a7f1d2299c80aad40ebc6e2954322434&type=album) обычный враг

![](https://sun9-51.userapi.com/impg/uNgY6dvrZdiQdi3T8mI6V5-M28qtPn8UsyDCpw/OGp8jR4DI3I.jpg?size=50x80&quality=96&sign=4d174a90ced8b0a1c46d81fafb10ffcf&type=album) ![](https://sun9-23.userapi.com/impg/n0fvxyK0z1vAc2fpbRxrAfgbwMw6MoypHAASnw/RmGhBWjScWk.jpg?size=50x80&quality=96&sign=af34e88f650876a42227c0e36617c22b&type=album) более сильный враг, появляются не с первых волн. Количество увеличивается по ходу игры

Типы башен:

![](https://sun9-26.userapi.com/impg/4DAprbM0PfqjjzlE1qwKTN5B6LcytmVCOQ12Zw/GUTjSqM4XjQ.jpg?size=50x50&quality=96&sign=d0692b54804c41f16d52e44a6ab2ae5c&type=album) Пулемёт, стреляет прямо по ближайшей цели

![](https://sun9-4.userapi.com/impg/YMHdOxJ9qhPOCfG_k_4MlJHBPD0ZRS6X0HX2Hw/ktIeYD26u9c.jpg?size=50x50&quality=96&sign=6acf29997de22cfbf778547db1fb19c0&type=album) Огнемёт, наносит урон в небольшом конусе

![](https://sun9-28.userapi.com/impg/qDqdTL5Heor9ZKNrdVfFbQUVo41CjPcYC-LR5g/znfoQaRVWKM.jpg?size=50x50&quality=96&sign=eda3f4282839ede4552c5d55b201424b&type=album) Лазер, бьёт прямым лучом нанося урон всем противникам, проходящим через него

![](https://sun9-39.userapi.com/impg/oR8pvo5E0dqnp5hyrVfBnhFiWljR0pK5-XYzlA/HlaZe0q10Fc.jpg?size=50x50&quality=96&sign=5aa13a39318d71a4ad2e696aea5ced81&type=album) Ракетная установка, стреляет по цели, но снаряд после выстрела не меняет траекторию и взрывается попав в то место пути, куда изначально целился. Повреждает те цели, которые в момент попадания находятся возле данной точки. Медленная.

## Ход игры:

#### Начало игры

Игра начинается с установки первой башни. С этого момента по пути от начала карты к её концу будут идти враги.

#### Установка башен

Иконки башен в панели управления, которые можно выбрать - кликабельны, и по клику нужная башня выделяется рамкой. После этого, при наведении на игровое поле, под указателем мышки игрока появляется полупрозрачное изображение башни на квадратике поля и прозрачный радиус поражения. по клику башню можно поставить на клетку.

Если ресурсов на башню не хватает (иконка показывается более блеклым цветом), то ее выбрать можно, но поставить на поле не получится (при переходе на поле под указателем не будет изображения башни и ее радиуса поражения).
(На макетах показан вариант, когда башню надо ставить ровно в пределах 1 клетки поля, но можно подумать и над тем, чтобы не привязываться к ячейке, а ставить башню с любым смещением от центра. тогда надо будет усложнять логику проверки куда можно ставить башню и вычислять ее границы). Радиус поражения в этом случае можно задавать не в клетках - а в пикселях. Игра становится более интересной (возможно).

#### Игровой процесс:

Установленные пользователем башни будут атаковать врагов, снижая уровень их очков здоровья. Когда количество этих очков становится равным нулю враг исчезает.

Каждый уничтоженный враг даёт пользователю внутриигровую валюту, за которую игрок может построить больше башен.

#### Уничтожение башни:

Башню можно снести и вернуть себе 50% ресурсов. Для этого надо выбрать иконку разрушить (становится активной когда на поле есть хотя бы одна башня) и навести на башню и кликнуть.

#### Завершение игры:

У игрока есть 3 жизни (то-есть разрешено пропустить 2-х врагов, а на третьем игра завершается и фиксируется счет).

После завершения появляются две кнопки “Играть снова” и “На главный экран”

#### Подсчет очков:

За простого врага - 1, за усиленного - 2. При расчете умножается на номер волны.
Количество врагов на каждой волне увеличивается.

## Идеи для дальнейшего развития проекта (дополняется)

- больше вариантов карт
- генератор карт
- больше вариантов противников и башен
- Улучшение графики, замена пиксельных противников и башен на более детализированные объекты.
- соревновательный режим 1х1

## Команда разработки

<table align="center">
  <tbody>
    <tr>
      <td valign="top">
        <a href="https://github.com/Kezzeret"><img width="150" height="150" src="https://ca.slack-edge.com/TPV9DP0N4-U01BDSXHZDZ-3709aab91b77-512"></a>
        <br>
        <a href="https://github.com/Kezzeret">Dmitry Kotelevets</a>
        <br>
        <p>dev</p>
      </td>
      <td valign="top">
        <a href="https://github.com/greyforce"><img width="150" height="150" src="https://ca.slack-edge.com/TPV9DP0N4-U01B6UW0LKY-d6d64d6756ca-512"></a>
        <br>
        <a href="https://github.com/greyforce">Gregory Kovorotny</a>
        <br>
        <p>dev</p>
      </td>
      <td valign="top">
        <a href="https://github.com/Diamis"><img width="150" height="150" src="https://ca.slack-edge.com/TPV9DP0N4-U01GT4G40BZ-07a4a7c07ea8-512"></a>
        <br>
        <a href="https://github.com/Diamis">Alexey Chernyshev</a>
        <br>
        <p>dev</p>
      </td>
     </tr>
  </tbody>
</table>
