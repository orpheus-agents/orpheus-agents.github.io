# Подключение к локальному Orpheus

Этот вариант связывает два готовых примера: [быстрый старт Orpheus](../getting-started/launch.md) и [Space](setup.md). Он использует сеть Docker и одинаковые команды на Linux и macOS. Порты остаются на `127.0.0.1`.

## Подготовьте сеть и ключ

```sh
docker network create orpheus-space-core
openssl rand -hex 32
```

Сохраните сгенерированный ключ в `examples/quickstart/.env` как `ORPHEUS_SPACE_CORE_API_KEY`. Это дополнительный ключ Orpheus для Space. Исходный ключ быстрого старта продолжит работать.

В том же файле закрепите дополнение Compose, чтобы следующие команды сохраняли сеть и оба ключа:

```dotenv
COMPOSE_FILE=compose.yaml:compose.space.yaml
```

В том же репозитории:

```sh
cd examples/quickstart
docker compose up -d --force-recreate api web
```

Дополнение подключает только API Orpheus к новой сети под именем `orpheus-core` и добавляет ключ в [`PUBLIC_API_KEYS`](../reference/environment.md#env-public-api-keys).

## Подключите Space

В `examples/space/.env` укажите:

```dotenv
COMPOSE_FILE=compose.yaml:compose.core.yaml
ORPHEUS_BASE_URL=http://orpheus-core:8000
ORPHEUS_API_KEY=<значение ORPHEUS_SPACE_CORE_API_KEY из quickstart/.env>
```

[`ORPHEUS_SPACE_API_KEY`](../reference/space.md#cli) оставьте прежним: это другой ключ, для обращения к самому Space.

```sh
cd ../space
docker compose up -d --force-recreate api web worker
docker compose ps
```

В общей сети находятся API Orpheus, API Space и worker Space. Каждый веб-интерфейс остаётся в своей исходной сети, поэтому одинаковые имена `api` не мешают проксированию. Адрес `orpheus-core` однозначно указывает на Orpheus.

Compose читает `COMPOSE_FILE` из `.env` каждого примера. Обычные команды запуска и обновления сохраняют подключение. Дождитесь `healthy` у worker Space и выполните [первое задание](first-task.md). Worker Orpheus также должен быть запущен и иметь доступ к AgentBox и модели.
