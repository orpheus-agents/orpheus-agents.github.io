# Состояния сессий и запусков

| Состояние запуска | Значение | Действие интеграции |
| --- | --- | --- |
| `accepted` | Задача принята | Сохранить ID и ждать |
| `starting` | Подготовка окружения | Следить за подготовкой и хуками |
| `running` | Агент выполняет задачу | Можно передать уточнение |
| `cancelling` | Выполняется отмена | Ждать завершения отмены |
| `finalizing` | Завершение и хуки | Дождаться результата доставки |
| `completed` | Запуск успешно завершён | Прочитать результат |
| `failed` | Запуск завершился с ошибкой | Проверить [`error`](api/get-run.md), фазу и хуки |
| `cancelled` | Запуск отменён | Проверить выполненные действия |

[`active_run_id`](api/get-session.md) показывает незавершённый запуск, [`last_run_id`](api/get-session.md) последний. Проверяйте конкретный запуск перед публикацией результата. Финальный текст может появиться до завершения [`after_run`](../configuration/hooks.md#hook-after-run).

Состояние песочницы отдельно: `not_created`, `provisioning`, `ready`, `pausing`, `paused`, `resuming`, `deleting`, `deleted`, `unavailable`. Сохранённый ID песочницы не гарантирует, что она доступна.

Ошибки содержат [`code`](api/schema-error.md), [`message`](api/schema-error.md), [`phase`](api/get-run.md), [`details`](api/schema-error.md). Фазы ошибки: `preparation`, `execution`, `finalization`, `recovery`. Поле [`phase`](api/get-run.md) выполнения может указывать на [`after_create`](../configuration/hooks.md#hook-after-create), [`before_run`](../configuration/hooks.md#hook-before-run), `agent` или [`after_run`](../configuration/hooks.md#hook-after-run).

Завершённая сессия может принять новый запуск при доступном окружении и бюджете. При потере контекста создайте новую сессию, передав необходимую историю из своей системы.
