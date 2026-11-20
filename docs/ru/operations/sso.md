# Вход через SSO

Режим браузерного доступа задаётся на API, а не на web.

| [`ORPHEUS_BROWSER_AUTH`](../reference/environment.md#env-orpheus-browser-auth) | Чтение | Управление аккаунтами, профилями и шаблонами | Команды сессиям |
| --- | --- | --- | --- |
| `api_only` | Bearer-ключ | Bearer-ключ | Bearer-ключ |
| `anonymous` | Без входа | Браузер или Bearer-ключ | Bearer-ключ |
| `saml` | SSO или Bearer-ключ | SSO или Bearer-ключ | Bearer-ключ |

`anonymous` подходит для изолированного локального стенда. Все пользователи, допущенные через SAML, видят общую историю. Ограничьте круг пользователей на стороне IdP.

## Настройка SAML

Передайте API следующие [переменные окружения](../reference/environment.md#env-orpheus-browser-auth):

```dotenv
ORPHEUS_BROWSER_AUTH=saml
ORPHEUS_PUBLIC_URL=https://orpheus.example.com
SAML_SP_ENTITY_ID=orpheus-web
SAML_IDP_METADATA_FILE=/etc/orpheus/saml/idp.xml
SAML_SP_CERT_FILE=/etc/orpheus/saml/sp.crt
SAML_SP_KEY_FILE=/run/secrets/orpheus-saml.key
BROWSER_SESSION_TTL_SECONDS=43200
```

1. Создайте сертификат и соответствующий приватный ключ SP (RSA или ECDSA).
2. Создайте SAML-клиент в IdP с entity ID `orpheus-web`.
3. Укажите ACS [`https://orpheus.example.com/auth/callback`](../reference/api/browser-callback.md), binding HTTP-POST.
4. Включите проверку подписей запросов сертификатом SP и подпись ответов и assertions через SHA-256.
5. Настройте стабильный NameID и AuthnStatement. В Keycloak параметр [`saml.authnstatement`](https://www.keycloak.org/docs/latest/server_admin/index.html#saml-clients) должен быть `true`.
6. Выгрузите метаданные IdP. Смонтируйте XML, сертификат и ключ в API по указанным путям.
7. Пересоздайте API и проверьте вход. Метаданные SP доступны на [`/saml/metadata`](../reference/api/saml-metadata.md).

[`ORPHEUS_PUBLIC_URL`](../reference/environment.md#env-orpheus-public-url) содержит внешний HTTPS-origin веб-интерфейса без завершающего слеша. Worker не нужны SAML-файлы.

Выход завершает сессию Orpheus. Общая сессия в IdP сохраняется. [Настройки Keycloak](https://www.keycloak.org/docs/latest/server_admin/index.html#saml-clients).

## Управление каталогами из браузера {#template-writes}

Все пользователи, допущенные через SAML, могут управлять [LLM-аккаунтами](../configuration/authentication.md), [профилями моделей](../configuration/profiles.md) и [шаблонами песочниц](../configuration/templates.md#manage). В том числе они могут читать и заменять файлы авторизации аккаунтов и заменять API-ключи. При анонимном доступе из браузера права те же.

Для изменений из браузера нужны точный `Origin` из [`ORPHEUS_PUBLIC_URL`](../reference/environment.md#env-orpheus-public-url) и заголовок `X-Orpheus-CSRF: 1`. Orpheus Web отправляет их сам. Для локального доступа задайте `ORPHEUS_PUBLIC_URL=http://localhost:8085` и открывайте этот адрес.

Другой origin или отсутствующий CSRF-заголовок возвращает `403 invalid_origin`. С действующим Bearer-ключом эти заголовки не нужны. Неверный `Authorization` возвращает `401`, даже если браузерная сессия существует.
