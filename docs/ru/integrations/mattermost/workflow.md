# Общий workflow

Workflow объединяет маршрутизацию, выбор профиля, шаблона и инструкции. Файл состоит из YAML между `---` и текста Markdown.

<<< @/../examples/quickstart/workflow.md.example{yaml}

Замените [`RECONCILE_FROM`](../../reference/mattermost.md#workflow-reconcile-from) на фиксированное время начала обработки, например время развёртывания в UTC. Скрипт быстрого старта делает это автоматически. Не сдвигайте дату при каждом рестарте.

Без [`include_ids`](../../reference/mattermost.md#workflow-include-ids) workflow обслуживает доступные ему каналы, не занятые специализированными workflows. По умолчанию новый тред запускается упоминанием бота.

Для личных сообщений добавьте [`direct_messages: true`](../../reference/mattermost.md#workflow-direct-messages). Для закрытых каналов и групповых сообщений нужны [`private_channels: true`](../../reference/mattermost.md#workflow-private-channels) и [`group_messages: true`](../../reference/mattermost.md#workflow-group-messages) соответственно. Бот должен быть добавлен в соответствующие каналы и группы. У одного бота может быть только один workflow, отвечающий за личные сообщения.

Тело файла является полной инструкцией этого помощника. В примере включены правила чтения вложений и возврата файлов. Меняйте их вместе с назначением агента.

[Workflows по каналам](channels.md) · [Все параметры](../../reference/mattermost.md)

Выберите для агента [сервисы](../../configuration/secrets.md#services) из каталога Orpheus:

```yaml
services: [helpdesk]
```

В каталоге должен существовать `helpdesk`, а значения его ENV должны быть переданы worker Orpheus. `services` можно сочетать с [`env_from`](../../reference/mattermost.md#workflow-env-from). Токен бота для файловых хуков остаётся в области запуска, если его явно не выбрали для сессии.
