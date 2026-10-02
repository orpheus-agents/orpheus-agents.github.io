# Запуск Space

Для выполнения заданий нужен [работающий Orpheus](../getting-started/launch.md) с профилем агента и шаблоном AgentBox. Space использует отдельную PostgreSQL БД. Сборка образов не требуется: пример запускает опубликованные образы API, worker и веб-интерфейса.

## Локальный интерфейс

В клоне репозитория документации:

```sh
cd examples/space
cp .env.example .env
```

Заполните `POSTGRES_PASSWORD` и `ORPHEUS_SPACE_API_KEY` в `.env` разными случайными значениями. Для каждого можно выполнить `openssl rand -hex 32`. Это параметры Compose: первый используется в [DSN](../reference/space.md#service), второй — в списке [ключей Space](../reference/space.md#access).

```sh
docker compose config --quiet
docker compose pull
docker compose up -d db migrate api web
curl -fsS http://localhost:9110/ready
```

Откройте `http://localhost:8086`. В этом примере включён [режим anonymous](access.md): интерфейс разрешает чтение и запись без входа, порты доступны только с локального компьютера. Открывайте именно `localhost`, поскольку [`ORPHEUS_PUBLIC_URL`](../reference/space.md#access) должен совпадать с origin браузера.

Без worker можно создать задание на паузе, отредактировать его и проверить расписание. Задания не выполняются.

## Подключите Orpheus

Если Orpheus запущен на той же машине по быстрому старту, используйте [готовое локальное подключение](local-core.md). Оно работает через Docker-сеть без публикации дополнительных портов.

Для другого сервера задайте [`ORPHEUS_BASE_URL` и `ORPHEUS_API_KEY`](../reference/space.md#core) в `.env`. Адрес должен быть доступен из контейнеров Space, а ключ — входить в [`PUBLIC_API_KEYS` Orpheus](../reference/environment.md#env-public-api-keys).

В [`space.toml`](../reference/space.md#execution) выберите существующий профиль и шаблон AgentBox. В примере это `default` и `codex`. Затем:

```sh
docker compose up -d api worker
docker compose ps
```

Дождитесь `healthy` у worker. Это подтверждает готовность процесса, но не связь с Orpheus. Её проверяет [первое задание](first-task.md). Неверный адрес оставит срабатывание в состоянии «Отправляется» с `core_unavailable`.

## Серверное размещение

Разместите веб-интерфейс на отдельном HTTPS-домене и включите [SAML](access.md). Передайте [`ORPHEUS_SPACE_UPSTREAM`](../reference/space.md#web) внутренний origin Space API. Веб-образ проксирует `/api/`, `/auth/` и `/saml/` к Space. API-ключ в браузер не передаётся.

API и worker используют одинаковые DSN и настройки исполнения. Запускайте один worker. Системный порт `9100` оставьте во внутренней сети. [Резервное копирование, проверки и обновление](operations.md).
