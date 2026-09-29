# Запуск бота Mattermost

Перед запуском добавьте бота в команду и тестовый канал Mattermost. Используйте токен того же бота, который указан в [`.env`](launch.md#заполните-настроики).

Проверьте файл [`workflows/assistant.md`](../integrations/mattermost/workflow.md):

- [`profile: default`](../reference/mattermost.md#workflow-profile) выбирает профиль из [`orpheus.toml`](../configuration/profiles.md).
- [`sandbox_template: codex`](../reference/mattermost.md#workflow-sandbox-template) выбирает шаблон AgentBox.
- [`mattermost.base_url`](../reference/mattermost.md#workflow-mattermost-base-url) содержит доступный HTTPS-адрес Mattermost.
- [`reconcile_from`](../reference/mattermost.md#workflow-reconcile-from) фиксирует начало обработки сообщений. `init.py` подставляет время создания конфигурации в UTC. Сообщения до этой точки не запускают задачи.

```sh
docker compose run --rm --no-deps mattermost validate
docker compose up -d mattermost
curl -fsS http://localhost:8081/readyz
```

В тестовом канале отправьте новое сообщение с упоминанием имени бота:

```text
@orpheus Составь короткий план проверки отчёта по продажам.
```

Используйте фактическое имя своего бота. Коннектор определяет его по токену. Если ответа нет, проверьте [диагностику](../operations/troubleshooting.md).

Далее: [проверка результата](first-task.md).
