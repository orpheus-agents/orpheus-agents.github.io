# Доступ и SSO

Space авторизует пользователей самостоятельно. Для него нужны отдельный домен и SAML-клиент. Cookie веб-интерфейса Orpheus не даёт доступ к Space. Круг пользователей каждого приложения задаётся в IdP.

## Режим доступа

Режим задаётся [`ORPHEUS_BROWSER_AUTH`](../reference/space.md#access) на API Space.

| Режим | Браузер | API-ключ |
| --- | --- | --- |
| `api_only` | Без доступа по cookie | Чтение и запись |
| `anonymous` | Чтение и запись без входа | Чтение и запись |
| `saml` | Чтение и запись после входа | Чтение и запись |

В режиме `anonymous` используйте изолированный локальный стенд. Все допущенные пользователи и владельцы API-ключей могут редактировать все задания, включая email владельца.

[Точные правила API, Origin и CSRF](../reference/space-api/conventions.md#authentication).

## Настройка SAML

Передайте API Space [настройки SAML](../reference/space.md#saml):

```dotenv
ORPHEUS_BROWSER_AUTH=saml
ORPHEUS_PUBLIC_URL=https://space.example.com
SAML_SP_ENTITY_ID=orpheus-space
SAML_IDP_METADATA_FILE=/etc/orpheus-space/idp.xml
SAML_SP_CERT_FILE=/etc/orpheus-space/sp.crt
SAML_SP_KEY_FILE=/run/secrets/space-sp.key
BROWSER_SESSION_TTL_SECONDS=43200
```

1. Подготовьте сертификат SP и соответствующий приватный ключ.
2. Создайте отдельный SAML-клиент IdP с entity ID `orpheus-space`. Разрешите вход нужной группе сотрудников.
3. Задайте ACS `https://space.example.com/auth/callback`, binding HTTP-POST.
4. Настройте проверку подписей запросов сертификатом SP и подпись ответов/assertions через SHA-256.
5. Настройте стабильный NameID и AuthnStatement, как при [настройке SSO Orpheus](../operations/sso.md).
6. Передайте SAML-атрибут с Name или FriendlyName `email`. В Keycloak добавьте User Property mapper: свойство пользователя `email` → SAML-атрибут `email`. Он нужен для подстановки владельца нового задания.
7. Выгрузите метаданные IdP, смонтируйте их вместе с сертификатом и ключом в API и перезапустите его.
8. Откройте Space, выполните вход и проверьте создание задания на паузе. Метаданные SP доступны по [`/saml/metadata`](../reference/space-api/saml-metadata.md).

Space также принимает email из NameID в формате email. Если email отсутствует или некорректен, вход работает, но владелец не подставляется. После изменения mapping выйдите из Space и войдите снова, чтобы обновить email в сессии.

Можно использовать ту же SP-пару, что у Orpheus, если она зарегистрирована и у клиента Space. Домены, клиенты и браузерные сессии приложений остаются отдельными. Worker Space не нужны SAML-файлы.

## Выход

Выход завершает локальную сессию Space. Сессии IdP и веб-интерфейса Orpheus сохраняются, поэтому повторный вход может пройти без ввода пароля.

Для изменения доступа к приложениям используйте правила IdP. Email владельца задания и правила [навыка](cli.md) не являются серверными разрешениями.
