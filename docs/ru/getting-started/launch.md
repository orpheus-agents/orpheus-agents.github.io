# Запуск Orpheus и веб-интерфейса

Скачайте комплект и создайте локальную конфигурацию:

```sh
git clone https://github.com/orpheus-agents/orpheus-agents.github.io.git
cd orpheus-agents.github.io/examples/quickstart
python3 init.py
```

Скрипт создаёт `.env`, [`orpheus.toml`](../configuration/profiles.md) и [`workflows/assistant.md`](../integrations/mattermost/workflow.md). Пароль БД, API-ключ Orpheus и ключ шифрования генерируются автоматически. Повторный запуск не перезаписывает файлы.

## Заполните настройки

1. В `.env` задайте [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key), [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key) и [`MATTERMOST_BOT_TOKEN`](../integrations/mattermost/connect.md).
2. В [`workflows/assistant.md`](../integrations/mattermost/workflow.md) найдите параметр [`mattermost.base_url`](../reference/mattermost.md#workflow-mattermost-base-url) и замените `https://chat.example.com` на HTTPS-адрес вашего сервера Mattermost. По этому адресу коннектор обменивается сообщениями, а песочницы AgentBox скачивают вложения и отправляют файлы с результатами.

В [`orpheus.toml`](../configuration/profiles.md) уже выбрана модель `gpt-6-sol`. При необходимости её можно изменить в параметре [`model`](../reference/profiles.md#profile-model) профиля `default`.

```sh
docker compose config --quiet
docker compose pull
docker compose up -d db migrate api worker web
curl -fsS http://localhost:9100/ready
```

Откройте `http://localhost:8085`. Список сессий пуст до первой задачи.

Проверьте состояние сервисов:

```sh
docker compose ps -a
```

Флаг `-a` включает в вывод завершившиеся контейнеры, чтобы можно было проверить результат `migrate`. Сравните состояния с таблицей:

| Сервис | Результат проверки |
| --- | --- |
| `db`, `api` | Healthy |
| `migrate` | Завершён с кодом 0 |
| `worker`, `web` | Running |

API доступен на порту 8000. Веб-интерфейс открыт для локального чтения. Все опубликованные порты привязаны к `127.0.0.1`. Для удалённого сервера используйте SSH-туннель или настройте [HTTPS и SSO](../operations/network.md).

Конфигурация: [compose.yaml](https://github.com/orpheus-agents/orpheus-agents.github.io/blob/main/examples/quickstart/compose.yaml).

Далее: [запуск коннектора](mattermost.md).
