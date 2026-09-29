# Профили и модели

Профиль задаёт модель, авторизацию и общие инструкции. Имена профилей выбираете вы. Коннектор передаёт имя в [`agent.profile`](../reference/api/create-session.md).

Профили описываются в файле конфигурации Orpheus — [`orpheus.toml`](../reference/profiles.md). В комплекте [быстрого старта](../getting-started/launch.md) он находится в каталоге `examples/quickstart/` рядом с [`compose.yaml`](../getting-started/launch.md).

```toml
[profiles.default]
harness = "codex"
model = "gpt-5.6-terra"
[profiles.default.auth]
mode = "api_key"
api_key_env = "OPENAI_API_KEY"

[profiles.deep-analysis]
harness = "codex"
model = "gpt-5.6-sol"
[profiles.deep-analysis.codex]
effort = "xhigh"
[profiles.deep-analysis.auth]
mode = "api_key"
api_key_env = "OPENAI_API_KEY"
```

Здесь Terra используется для общих задач, Sol с `xhigh` для отдельного канала. Это пример распределения, а не требование к моделям. Подставьте идентификаторы, доступные вашей авторизации.

Параметры [`effort`](../reference/profiles.md#profile-codex-effort), [`summary`](../reference/profiles.md#profile-codex-summary), [`personality`](../reference/profiles.md#profile-codex-personality) и [`service_tier`](../reference/profiles.md#profile-codex-service-tier) задаются в [`orpheus.toml`](../reference/profiles.md) для нужного профиля. При отсутствии параметра Orpheus не отправляет его агенту. Пустая строка не равна отсутствию.

После изменения [`orpheus.toml`](../reference/profiles.md) пересоздайте API и worker с одной конфигурацией. Существующие сессии сохраняют настройки. Для Mattermost увеличьте [`revision`](../reference/mattermost.md#workflow-revision) workflow, чтобы следующий запрос создал новую сессию.

[Справочник профилей](../reference/profiles.md) · [Пример маршрутизации](../integrations/mattermost/channels.md)
