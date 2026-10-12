# Таймауты, параллельность и токены

Ограничения управляют разными ресурсами. Настройте их под длительность и объём задач.

| Настройка | Что ограничивает | Значение по умолчанию |
| --- | --- | --- |
| [`MAX_CONCURRENT_SESSIONS`](../reference/environment.md#env-max-concurrent-sessions) | Одновременно занятые слоты исполнения | 50 |
| [`SANDBOX_PROVISION_TIMEOUT_SECONDS`](../reference/environment.md#env-sandbox-provision-timeout-seconds) | Первоначальное создание и подключение песочницы | 120 с |
| [`run_timeout_seconds`](../reference/api/create-session.md) | Время исполнения агента в запуске | 3600 с |
| [`hooks.timeout_seconds`](../reference/api/create-session.md) | Время каждого хука | 300 с |
| [`max_session_tokens`](../reference/api/create-session.md) | Входные и выходные токены всех запусков сессии | 100 000 000 |

```json
{
  "run_timeout_seconds": 900,
  "max_session_tokens": 500000
}
```

Это значение [`configuration.limits`](../reference/api/create-session.md). В Mattermost аналогичные поля задаются в workflow. [`max_concurrent_runs`](../reference/mattermost.md#workflow-max-concurrent-runs) дополнительно ограничивает одновременную работу конкретного workflow.

При исчерпании глобальной ёмкости новый запрос получает `503 capacity_exhausted`. Коннектор должен повторить его позже с тем же ключом идемпотентности. Бюджет токенов измеряется по отчётам агента, поэтому не служит точным денежным лимитом. Исчерпанная сессия не принимает новые запуски.

Первоначальная подготовка песочницы имеет отдельный дедлайн. По его истечении запуск завершается с `sandbox_provision_timeout`. Отмена на этом этапе завершается даже при ошибках запросов к AgentBox. Orpheus продолжает искать песочницу и удаляет её, если находит. До подтверждения удаления слот исполнения остаётся занят, в том числе после завершения запуска. См. [диагностику](../operations/troubleshooting.md).

Orpheus продлевает время активности песочницы во время работы. Таймаут запуска не требуется прибавлять к таймауту хуков вручную. Максимальная непрерывная жизнь песочницы определяется [тарифом AgentBox](https://docs.agentbox.ru/ru/billing/).

[Лимиты аккаунтов](../web/limits.md) отражают квоты провайдера отдельно от этих настроек.
