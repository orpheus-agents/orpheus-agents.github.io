# Авторизация агента

Выберите авторизацию для каждого профиля в [`orpheus.toml`](profiles.md). Примеры ниже добавляются в этот файл.

## API-ключ

```toml
[profiles.default.auth]
mode = "api_key"
api_key_env = "OPENAI_API_KEY"
```

Передайте [`OPENAI_API_KEY`](../reference/environment.md#env-openai-api-key) процессу worker. Поле содержит имя переменной, а не сам ключ. Не добавляйте этот ключ в [`sandbox.env_from`](../reference/api/create-session.md): авторизацию модели Orpheus настраивает отдельно.

## Аккаунт

Загрузите действующий файл авторизации Codex `auth.json` в закрытый S3-совместимый бакет. Используйте файл аккаунта, предназначенного для этой инсталляции.

```toml
[credential_stores.main]
type = "s3"
bucket = "orpheus-credentials"
region = "us-east-1"

[profiles.team]
harness = "codex"
model = "gpt-6-sol"
[profiles.team.auth]
mode = "account"
account_id = "support-team"
store = "main"
key = "codex/support/auth.json"
```

Для своего S3 задайте [`endpoint_url`](../reference/profiles.md#store-endpoint-url) в хранилище. Передайте worker доступ к бакету через стандартные AWS credentials, например [`AWS_ACCESS_KEY_ID`](../reference/profiles.md#store-access) и [`AWS_SECRET_ACCESS_KEY`](../reference/profiles.md#store-access). Обновляйте файл авторизации при смене учётных данных.

Один аккаунт должен иметь одинаковый [`account_id`](../reference/profiles.md#profile-auth-account-id) и источник credentials во всех профилях. Этот идентификатор появляется в [лимитах аккаунтов](../web/limits.md). При смене самого аккаунта задайте новый ID.
