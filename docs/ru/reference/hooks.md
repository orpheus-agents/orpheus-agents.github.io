# Хуки и переменные окружения

Хук передаётся строкой скрипта с shebang в [`configuration.hooks`](api/create-session.md). Рабочий каталог соответствует workspace сессии. Выберите интерпретатор, установленный в шаблоне.

| Переменная | Доступность | Назначение |
| --- | --- | --- |
| <span id="env-orpheus-session-id"></span>`ORPHEUS_SESSION_ID` | Все выполняемые хуки | UUID сессии |
| <span id="env-orpheus-workspace-path"></span>`ORPHEUS_WORKSPACE_PATH` | Все выполняемые хуки | Абсолютный путь workspace |
| <span id="env-orpheus-hook-operation-id"></span>`ORPHEUS_HOOK_OPERATION_ID` | Все выполняемые хуки | Устойчивый ID операции хука |
| <span id="env-orpheus-run-id"></span>`ORPHEUS_RUN_ID` | [`before_run`](../configuration/hooks.md#hook-before-run), [`after_run`](../configuration/hooks.md#hook-after-run) | UUID запуска |
| <span id="env-orpheus-input-fingerprint"></span>`ORPHEUS_INPUT_FINGERPRINT` | [`before_run`](../configuration/hooks.md#hook-before-run), [`after_run`](../configuration/hooks.md#hook-after-run), если задан | Версия входных данных |
| <span id="env-orpheus-agent-status"></span>`ORPHEUS_AGENT_STATUS` | [`after_run`](../configuration/hooks.md#hook-after-run), если известен | `completed`, `failed`, `cancelled` |
| <span id="env-orpheus-stop-reason"></span>`ORPHEUS_STOP_REASON` | [`after_run`](../configuration/hooks.md#hook-after-run), если известна | Причина остановки |

Переменные запуска не становятся переменными агента. Передайте нужный несекретный контекст через подготовленный файл или текст задачи.

При совпадении имён поля [`env`](api/create-run.md), [`env_from`](api/create-run.md) и [`services`](api/create-run.md) на верхнем уровне запроса запуска перекрывают сессионные значения для [`before_run`](../configuration/hooks.md#hook-before-run) и [`after_run`](../configuration/hooks.md#hook-after-run). Они не влияют на [`after_create`](../configuration/hooks.md#hook-after-create) и процесс агента.

Хуки: [`after_create`](../configuration/hooks.md#hook-after-create) выполняется после создания окружения, [`before_run`](../configuration/hooks.md#hook-before-run) перед задачей, [`after_run`](../configuration/hooks.md#hook-after-run) после подтверждённого завершения. [`before_remove`](api/create-session.md) не выполняется.

Ненулевой код завершения или таймаут фиксируются как ошибка хука. Лимит сохраняемого stdout/stderr не останавливает сам скрипт. Для сетевых вызовов задавайте таймаут меньше общего таймаута хука.

[Практическое руководство](../configuration/hooks.md) · [Публикация ответа](../integrations/custom/helpdesk-hook.md)
