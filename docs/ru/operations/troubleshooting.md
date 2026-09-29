# Диагностика проблем

Начните с `docker compose ps -a`, карточки запуска и логов соответствующего сервиса.

| Симптом | Что проверить |
| --- | --- |
| Бот не отвечает | Членство в канале, упоминание, [`include_ids`](../reference/mattermost.md#workflow-include-ids), [`reconcile_from`](../reference/mattermost.md#workflow-reconcile-from), токен |
| Workflow не загружается | [`validate`](../integrations/mattermost/reload.md), YAML, строковую [`revision`](../reference/mattermost.md#workflow-revision), пересечения маршрутов |
| [`unknown_profile`](../configuration/profiles.md) | Совпадение имени профиля и конфигурации API/worker |
| [`validation_error`](../reference/api/schema-error.md) | [`error.details`](../reference/api/schema-error.md) с путём некорректного поля |
| [`capacity_exhausted`](../configuration/limits.md) | Активные задачи и лимит параллельности |
| Ошибка авторизации модели | Credentials worker, режим профиля и доступ к модели |
| Ошибка подготовки файлов | Доступ к Mattermost из AgentBox, Python, размер файлов |
| Ответ есть, файла нет | Инструкцию outbox, ошибки [`after_run`](../configuration/hooks.md#hook-after-run), ограничения файлов |
| Web сообщает об отсутствии доступа | [`ORPHEUS_BROWSER_AUTH`](../reference/environment.md#env-orpheus-browser-auth), SSO и публичный origin |
| Обновления приходят с задержкой | SSE-буферизацию reverse proxy и состояние подключения |
| SAML callback возвращает 401 | Подписи, ACS, время, AuthnStatement и метаданные |
| Старые модель или инструменты | Сохранённую конфигурацию сессии и [`revision`](../reference/mattermost.md#workflow-revision) workflow |

## Как собрать данные для разбора

Запишите действие пользователя, время, [`session_id`](../reference/api/get-session.md), [`run_id`](../reference/api/get-run.md), код и фазу ошибки. Проверьте, повторяется ли проблема на новой тестовой задаче. Перед передачей логов удалите секреты и ненужные данные пользователей.

Не удаляйте БД и не пересоздавайте все сессии как первый шаг. Например, отказ публикации не означает, что агенту нужно заново выполнять задачу. Сначала проверьте, не появился ли результат в целевой системе.

[Состояния и фазы](../reference/states.md) · [Ошибки API](../reference/api/conventions.md)
