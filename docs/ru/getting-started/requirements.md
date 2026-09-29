# Подготовка окружения и доступов

Результат быстрого старта: бот отвечает в Mattermost, а его работу можно посмотреть в веб-интерфейсе Orpheus.

## Установите инструменты

На компьютере или Linux-сервере установите [Docker с Compose](https://docs.docker.com/engine/install/), Git и Python 3. Проверьте:

```sh
docker version
docker compose version
git --version
python3 --version
```

Docker должен быть запущен. Для компьютера подходит Docker Desktop. На сервере нужны Docker Engine и Compose plugin. Используйте Compose 2.24 или новее.

## Подготовьте сервисы

1. Создайте проект AgentBox и получите [API-ключ](https://docs.agentbox.ru/ru/quickstart/api-key/). Для примера используется готовый шаблон [`codex`](https://docs.agentbox.ru/ru/agents/codex/) с Python.
2. Подготовьте API-ключ провайдера модели. В примере используется `gpt-6-sol`.
3. Подготовьте сервер Mattermost с HTTPS-адресом. Коннектору нужен доступ к этому серверу для обмена сообщениями, а песочницам AgentBox — для скачивания вложений и отправки созданных агентом файлов. Если сервера нет, разверните его по [инструкции ниже](#если-mattermost-еще-не-установлен).
4. Создайте бота по [инструкции подключения](../integrations/mattermost/connect.md) и сохраните его токен.

Адрес Mattermost и токен бота понадобятся на следующем шаге — при [заполнении настроек Orpheus](launch.md#заполните-настроики).

## Если Mattermost ещё не установлен

На Linux-сервере с Docker скачайте официальный комплект:

```sh
git clone https://github.com/mattermost/docker.git mattermost-server
cd mattermost-server
cp env.example .env
mkdir -p volumes/app/mattermost/{config,data,logs,plugins,client/plugins,bleve-indexes}
sudo chown -R 2000:2000 volumes/app/mattermost
```

В [`.env`](https://docs.mattermost.com/deployment-guide/server/deploy-containers) задайте [`DOMAIN`](https://docs.mattermost.com/deployment-guide/server/deploy-containers), пароль PostgreSQL и фиксированный [`MATTERMOST_IMAGE_TAG`](https://docs.mattermost.com/deployment-guide/server/deploy-containers). Запустите сервисы:

```sh
docker compose -f docker-compose.yml -f docker-compose.without-nginx.yml up -d
```

Направьте HTTPS reverse proxy вашего домена на порт 8065. Сохраните WebSocket-подключения. Откройте сайт, создайте администратора, команду и тестовый канал. Затем создайте бота по следующей инструкции. Подробности TLS и сетевых настроек приведены в [руководстве Mattermost](https://docs.mattermost.com/deployment-guide/server/deploy-containers).

Далее: [запуск сервисов](launch.md).
