# Общий workflow

Workflow объединяет маршрутизацию, выбор профиля, шаблона и инструкции. Файл состоит из YAML между `---` и текста Markdown.

<<< @/../examples/quickstart/workflow.md.example{yaml}

Замените [`RECONCILE_FROM`](../../reference/mattermost.md#workflow-reconcile-from) на фиксированное время начала обработки, например время развёртывания в UTC. Скрипт быстрого старта делает это автоматически. Не сдвигайте дату при каждом рестарте.

Без [`include_ids`](../../reference/mattermost.md#workflow-include-ids) workflow обслуживает доступные ему каналы, не занятые специализированными workflows. По умолчанию новый тред запускается упоминанием бота.

Для личных сообщений добавьте [`direct_messages: true`](../../reference/mattermost.md#workflow-direct-messages). Для закрытых каналов и групповых сообщений нужны [`private_channels: true`](../../reference/mattermost.md#workflow-private-channels) и [`group_messages: true`](../../reference/mattermost.md#workflow-group-messages) соответственно. Бот должен быть добавлен в соответствующие каналы и группы. У одного бота может быть только один workflow, отвечающий за личные сообщения.

Тело файла является полной инструкцией этого помощника. В примере включены правила чтения вложений и возврата файлов. Меняйте их вместе с назначением агента.

## Обращение к боту по имени {#trigger-names}

Добавьте в YAML workflow [список имён](../../reference/mattermost.md#workflow-trigger-names), [регулярное выражение](../../reference/mattermost.md#workflow-trigger-name-regex) или оба поля.

```yaml
trigger_names: [Orpheus, Orphy]
trigger_name_regex: 'orpheus-[0-9]+'
```

`Orphy, check the logs` совпадает со списком, а `ORPHEUS-42: check the logs` — с выражением. Оба обращения запускают работу в треде или продолжают её, как `@orpheus`. При двух совпадениях пост принимается один раз.

Поставьте имя обычным текстом в начале первой строки сообщения. После имени нужен пробел, запятая, двоеточие, точка, восклицательный или вопросительный знак, многоточие либо конец строки. При сравнении имён регистр игнорируется. Выражение использует синтаксис Go и по умолчанию тоже игнорирует регистр.

## Выбор профиля по хештегу {#profile-tags}

Чтобы в одном канале можно было выбирать модель для задачи, добавьте в YAML раздел [`profile_by_tag`](../../reference/mattermost.md#workflow-profile-by-tag). Укажите имена активных [профилей](../../configuration/profiles.md) и [шаблонов](../../configuration/templates.md#manage) из каталога Orpheus.

```yaml
profile: default
sandbox_template: codex
profile_by_tag:
  fast:
    profile: codex-fast
  research:
    profile: research
    sandbox_template: opencode
```

При таких настройках запрос `@orpheus Сравни отчёты #research` выберет для треда профиль `research` и шаблон `opencode`. С тегом `#fast` бот использует профиль `codex-fast` и шаблон по умолчанию `codex`. Без знакомого тега он возьмёт `default` и `codex`.

Поставьте тег в первом сообщении, которое вызывает бота в тред. Это может быть и ответ в уже начатой дискуссии. Чтобы выбрать другой профиль или шаблон после принятия запроса, начните новый тред.

## Доступ агента к сервисам

Выберите для агента [сервисы](../../configuration/secrets.md#services) из каталога Orpheus:

```yaml
services: [helpdesk]
```

В каталоге должен существовать `helpdesk`, а worker Orpheus должен получить значения источников из его `credentials`. `services` можно сочетать с [`env_from`](../../reference/mattermost.md#workflow-env-from). Токен бота для файловых хуков остаётся в области запуска, если его явно не выбрали для сессии.

[Workflows по каналам](channels.md) · [Применение изменений](reload.md) · [Все параметры](../../reference/mattermost.md)
