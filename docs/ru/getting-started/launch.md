# Запуск Orpheus и веб-интерфейса

Скачайте комплект и создайте локальную конфигурацию:

```sh
git clone https://github.com/orpheus-agents/orpheus-agents.github.io.git
cd orpheus-agents.github.io/examples/quickstart
python3 init.py
```

Скрипт создаёт `.env`, [`orpheus.toml`](../configuration/profiles.md) и [`workflows/assistant.md`](../integrations/mattermost/workflow.md). Пароль БД, API-ключ Orpheus и ключ шифрования генерируются автоматически. Повторный запуск не перезаписывает файлы.

## Заполните настройки

1. В `.env` задайте [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key) и [`MATTERMOST_BOT_TOKEN`](../integrations/mattermost/connect.md).
2. В [`workflows/assistant.md`](../integrations/mattermost/workflow.md) найдите параметр [`mattermost.base_url`](../reference/mattermost.md#workflow-mattermost-base-url) и замените `https://chat.example.com` на HTTPS-адрес вашего сервера Mattermost. По этому адресу коннектор обменивается сообщениями, а песочницы AgentBox скачивают вложения и отправляют файлы с результатами.
3. Укажите тот же адрес в `services.mattermost.endpoint` в [каталоге сервисов](../configuration/secrets.md#services). Песочница получит его в `MATTERMOST_URL`, если выбрать сервис `mattermost`.

База запускается с пустыми каталогами аккаунтов и профилей. Для применения миграций TOML с профилями не нужен.

```sh
docker compose config --quiet
docker compose pull
docker compose up -d db migrate api worker web
curl -fsS http://localhost:9100/ready
```

Откройте `http://localhost:8085`.

В **Настройки → LLM-аккаунты** создайте аккаунт Codex с режимом **API-ключ** и введите ключ провайдера. Затем в **Настройки → Профили** создайте активный профиль `default`, выберите этот аккаунт и укажите модель `gpt-6-sol` или другую доступную вашему аккаунту. [Настройка профилей](../configuration/profiles.md).

В разделе **Настройки → Шаблоны** нажмите **Добавить шаблон** и зарегистрируйте `codex`, собранный в вашем проекте AgentBox. Оставьте тег пустым, а шаблон активным. При регистрации проверяется тег `default`. [Подробнее о регистрации](../configuration/templates.md#register).

Открывайте Web через `localhost`: настроенный [публичный origin](../reference/environment.md#env-orpheus-public-url) — `http://localhost:8085`. Через `127.0.0.1:8085` доступно чтение, но браузерные изменения отклоняются.

Список сессий пуст до первой задачи. Пустой каталог шаблонов не позволяет создавать сессии.

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

API доступен на порту 8000. Веб-интерфейс доступен локально, включая управление шаблонами. Все опубликованные порты привязаны к `127.0.0.1`. Для удалённого сервера используйте SSH-туннель или настройте [HTTPS и SSO](../operations/network.md).

Конфигурация: [compose.yaml](https://github.com/orpheus-agents/orpheus-agents.github.io/blob/main/examples/quickstart/compose.yaml).

Далее: [запуск коннектора](mattermost.md).
