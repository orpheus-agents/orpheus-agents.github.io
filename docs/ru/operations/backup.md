# Данные и резервное копирование

Резервируйте базу данных и конфигурацию. Файлы песочниц и исходные данные корпоративных систем находятся вне PostgreSQL Orpheus.

| Что сохранить | Зачем |
| --- | --- |
| PostgreSQL | История сессий, запусков и принятых сообщений |
| [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key) | Расшифровка сохранённых переменных |
| [`orpheus.toml`](../configuration/profiles.md) и [workflows](../integrations/mattermost/workflow.md) | Воспроизведение настроек |
| Секреты и файлы SAML | Подключение сервисов и вход пользователей |
| S3 credentials store | Авторизация профилей аккаунтов |

## Копия PostgreSQL

Из каталога Compose-комплекта:

```sh
docker compose exec -T db pg_dump -U orpheus -d orpheus -Fc > orpheus.dump
```

Храните копию в защищённом хранилище отдельно от сервера. Проверьте восстановление в отдельную пустую БД, а не поверх рабочей:

```sh
pg_restore --no-owner --no-acl --dbname="$RESTORE_DATABASE_URL" orpheus.dump
```

Для команды нужен PostgreSQL client. `RESTORE_DATABASE_URL` должен указывать на тестовую БД. Сохраните ключ шифрования и настройки, соответствующие копии.

Восстановленная история не восстанавливает удалённую песочницу. Не запускайте восстановленный worker параллельно с рабочим на тех же задачах. Готовые документы и комментарии должны храниться в целевой системе.

`docker compose down` сохраняет volume. `down -v` удаляет его.
