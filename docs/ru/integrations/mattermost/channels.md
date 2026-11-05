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

## Приватные каналы

Наличие канала в [`include_ids`](../../reference/mattermost.md#workflow-include-ids) не включает обработку приватных каналов. Задайте [`private_channels: true`](../../reference/mattermost.md#workflow-private-channels) в подходящем workflow до добавления бота. Групповым сообщениям отдельно нужен [`group_messages`](../../reference/mattermost.md#workflow-group-messages).

Коннектор выходит из приватных каналов без подходящего workflow. Проверка выполняется при старте, перезагрузке конфигурации, событиях членства и опросе. До запуска или перезагрузки включите [`private_channels`](../../reference/mattermost.md#workflow-private-channels) для каждого приватного канала, где бот должен остаться. Удаление маршрута или отключение приватных каналов также приводит к выходу бота. Если выход не удался, готовность и новые запуски блокируются до успешного повтора. Перед повторным приглашением бота настройте и загрузите маршрут.