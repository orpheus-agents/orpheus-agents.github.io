# Окружение и шаблоны песочниц

Шаблон определяет, какие программы и файлы доступны агенту. Для первого запуска выберите готовый шаблон [codex](https://docs.agentbox.ru/ru/agents/codex/). Для корпоративного помощника подготовьте шаблон с CLI, навыками и конфигурацией MCP нужных систем.

1. Опишите окружение по [инструкции AgentBox](https://docs.agentbox.ru/ru/templates/).
2. Добавьте программы, зависимости и инструкции работы с ними.
3. Соберите шаблон в том же проекте AgentBox, ключ которого использует worker.
4. Укажите имя в [`configuration.sandbox.template`](../reference/api/create-session.md) при создании сессии через API или в [`sandbox_template`](../reference/mattermost.md#workflow-sandbox-template) при [настройке workflow Mattermost](../integrations/mattermost/workflow.md).
5. Создайте новую сессию и проверьте доступность инструментов.

Для Mattermost требуется Linux и Python 3.9 или новее. Скрипты работы с вложениями коннектор устанавливает сам.

## Изменения окружения

Обновление образа не изменяет уже созданные песочницы. Для Mattermost после обновления шаблона увеличьте [`revision`](../reference/mattermost.md#workflow-revision) workflow. В [своей интеграции](../integrations/custom/overview.md) создайте новую сессию с нужным шаблоном.

Файлы и контекст сохраняются между запусками сессии при паузе песочницы. Храните опубликованный результат в целевой системе, чтобы он был доступен независимо от состояния песочницы.

[Имена шаблонов](https://docs.agentbox.ru/ru/templates/names/) · [Теги и версии](https://docs.agentbox.ru/ru/templates/tags/)
