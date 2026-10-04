# Подключение бота

Коннектор связывает треды Mattermost с сессиями Orpheus и возвращает сообщения и файлы в исходный тред.

## Создайте бота

1. Включите создание bot accounts в настройках интеграций Mattermost.
2. Откройте Integrations → Bot Accounts и создайте бота с понятным именем, например `orpheus`.
3. Сохраните выданный токен в [`.env`](../../getting-started/launch.md#заполните-настроики) как `MATTERMOST_BOT_TOKEN`.
4. Добавьте бота в нужную команду и каналы.
5. Укажите адрес Mattermost и имя переменной токена в workflow.

```yaml
mattermost:
  base_url: https://chat.example.com
  token_env: MATTERMOST_BOT_TOKEN
```

Передайте токен коннектору и worker. Включите `MATTERMOST_BOT_TOKEN` в [сервис](../../configuration/secrets.md#services) или [`HARNESS_ENV_ALLOWLIST`](../../reference/environment.md#env-harness-env-allowlist) на API и worker: его используют файловые хуки. Каталог быстрого старта уже содержит это имя.

Сервис быстрого старта можно выбрать и в Space: агент получит права токена бота на чтение и публикацию. Чтобы токен не появлялся в выборе сервисов, оставьте его имя в `HARNESS_ENV_ALLOWLIST` и не включайте в каталог. Это не ограничивает доверенные API-клиенты и workflows, явно выбирающие имена ENV. Подробнее об [областях запроса](../../configuration/secrets.md#hook-secrets).

Идентификатор и имя бота определяются по токену. Workflow одного бота должны использовать одно имя переменной токена. Для разных ботов можно настроить независимые наборы workflows.

Проверка: `docker compose run --rm --no-deps mattermost validate`, затем запуск и запрос [`/readyz`](../../operations/monitoring.md). [`validate`](reload.md) проверяет локальную конфигурацию. Доступность сервера и токен проверяются при запуске.

[Управление ботами Mattermost](https://developers.mattermost.com/integrate/reference/bot-accounts/) · [Быстрый старт](../../getting-started/mattermost.md)
