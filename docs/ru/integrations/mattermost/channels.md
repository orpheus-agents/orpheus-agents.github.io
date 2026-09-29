# Workflows для отдельных каналов

Оставьте [`assistant.md`](workflow.md) общим workflow с [`profile: default`](../../reference/mattermost.md#workflow-profile). Для канала сложных задач создайте `analysis.md`:

```yaml
---
id: analysis
revision: "1"
reconcile_from: "2026-09-29T12:00:00Z"
profile: deep-analysis
sandbox_template: codex
include_ids:
  - CHANNEL_ID
mattermost:
  base_url: https://chat.example.com
  token_env: MATTERMOST_BOT_TOKEN
---
```

После YAML добавьте инструкции по анализу и правила работы с файлами из общего workflow. Подставьте ID канала, а не его название. Время замените на начало обработки этого канала.

В [профилях](../../configuration/profiles.md) `default` использует Terra, а `deep-analysis` использует Sol с `xhigh`. Выбор канала определяет профиль без команд со стороны пользователя.

В этом примере задачи распределяются так:

- Канал, указанный в [`include_ids`](../../reference/mattermost.md#workflow-include-ids), обрабатывает `analysis.md`.
- Общий [`assistant.md`](workflow.md) продолжает работать в остальных доступных каналах. Канал для `analysis.md` исключается из общего workflow автоматически.

Если нужно запретить workflow обрабатывать какой-либо канал, добавьте ID канала в [`exclude_ids`](../../reference/mattermost.md#workflow-exclude-ids).

Не назначайте один канал двум специализированным workflows: проверка конфигурации выдаст ошибку.

Проверьте каталог командой [`validate`](reload.md), затем [примените изменения](reload.md). После смены профиля под прежним именем увеличьте [`revision`](../../reference/mattermost.md#workflow-revision).
