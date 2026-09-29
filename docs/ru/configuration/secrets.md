# Доступы и секреты

Чтобы передать агенту токен корпоративной системы, настройте три места:

1. Разрешите имя переменной в [`HARNESS_ENV_ALLOWLIST`](../reference/environment.md#env-harness-env-allowlist) на API и worker.
2. Передайте её значение процессу worker.
3. Выберите переменную в [`configuration.sandbox.env_from`](../reference/api/create-session.md) при создании сессии через API или в [`env_from`](../reference/mattermost.md#workflow-env-from) [workflow Mattermost](../integrations/mattermost/workflow.md).

```yaml
# Environment API and worker
HARNESS_ENV_ALLOWLIST: '["MATTERMOST_BOT_TOKEN", "HELPDESK_TOKEN"]'
# Worker only
HELPDESK_TOKEN: ${HELPDESK_TOKEN}
```

```json
{
  "template": "codex",
  "env_from": ["HELPDESK_TOKEN"]
}
```

JSON показывает значение [`configuration.sandbox`](../reference/api/create-session.md). Список разрешённых имён сам по себе не передаёт переменные каждой сессии.

## Секреты только для хуков {#hook-secrets}

Поля [`env`](../reference/api/create-session.md) и [`env_from`](../reference/api/create-session.md) на верхнем уровне запросов создания сессии и [нового запуска](../reference/api/create-run.md) доступны только [`before_run`](hooks.md#hook-before-run) и [`after_run`](hooks.md#hook-after-run). Они не передаются агенту. Так можно дать скрипту публикации отдельный токен. Не записывайте его в доступные агенту файлы или вывод хука.

Явные значения [`sandbox.env`](../reference/api/create-session.md) шифруются при хранении в БД ключом [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key). Сохраняйте этот ключ между перезапусками и резервируйте отдельно от БД. Системные имена, включая [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key), [`AGENTBOX_API_KEY`](../reference/environment.md#env-agentbox-api-key) и [`ORPHEUS_*`](../reference/environment.md) из зарезервированного списка, нельзя использовать как произвольные секреты.

[Пример публикации через хук](../integrations/custom/helpdesk-hook.md)
