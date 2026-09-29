# Подготовка и завершение работы

Хуки выполняют повторяемые действия в песочнице до или после работы агента. Передавайте текст исполняемого скрипта с shebang в [`configuration.hooks`](../reference/api/create-session.md).

| Хук | Когда выполняется | Пример |
| --- | --- | --- |
| <span id="hook-after-create"></span>`after_create` | После создания рабочего окружения | Подготовить каталоги |
| <span id="hook-before-run"></span>`before_run` | Перед каждой задачей | Скачать данные и записать путь результата |
| <span id="hook-after-run"></span>`after_run` | После подтверждённого завершения агента, до паузы или удаления песочницы | Отправить готовый файл |

```json
{
  "before_run": "#!/bin/sh\nset -eu\nmkdir -p replies\n",
  "timeout_seconds": 120
}
```

Проверьте статус агента перед публикацией: `after_run` может выполняться после неуспешного завершения. Используйте [`ORPHEUS_AGENT_STATUS`](../reference/hooks.md#env-orpheus-agent-status) и [`ORPHEUS_STOP_REASON`](../reference/hooks.md#env-orpheus-stop-reason). Хук не заменяет внешний контроль доставки, если песочница потеряна или выполнение не удалось подтвердить.

Для привязки результата используйте [`ORPHEUS_SESSION_ID`](../reference/hooks.md#env-orpheus-session-id), [`ORPHEUS_RUN_ID`](../reference/hooks.md#env-orpheus-run-id) и [`ORPHEUS_HOOK_OPERATION_ID`](../reference/hooks.md#env-orpheus-hook-operation-id). Повторная попытка доставки должна проверять, не был ли результат уже опубликован.

[`timeout_seconds`](../reference/api/create-session.md) ограничивает каждый хук отдельно. Результат выполнения и ошибки видны в карточке запуска. Поле [`before_remove`](../reference/api/create-session.md) не выполняется: не используйте его для очистки.

[Справочник хуков](../reference/hooks.md) · [Пример хелпдеска](../integrations/custom/helpdesk-hook.md)
