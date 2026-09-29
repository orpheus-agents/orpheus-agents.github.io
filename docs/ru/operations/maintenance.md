# Управление сервисами и обновление

Команды ниже выполняются из каталога Compose-комплекта.

```sh
docker compose ps -a
docker compose logs --tail=100 api worker mattermost
docker compose stop
docker compose up -d
```

`ps -a` показывает и завершённые миграции. `stop` останавливает контейнеры, `down` также удаляет контейнеры и сеть. Volume БД сохраняется без флага `-v`.

## Обновление

1. Включите [`draining: true`](../reference/mattermost.md#workflow-draining) в workflows и примените их.
2. Дождитесь завершения задач и доставки результатов. Остановите приём задач своими коннекторами.
3. Сделайте резервную копию БД и конфигурации.
4. Измените версии образов в [`.env`](../getting-started/launch.md#заполните-настроики).
5. Остановите прикладные сервисы, скачайте образы, выполните миграции и запустите сервисы:

```sh
docker compose stop mattermost web worker api
docker compose pull
docker compose run --rm migrate
docker compose up -d --force-recreate api worker mattermost web
```

6. Проверьте [`/ready`](monitoring.md), [`/readyz`](monitoring.md), вход в web и тестовую задачу. Снимите [`draining`](../reference/mattermost.md#workflow-draining) и возобновите приём событий.

Обычный `restart` не перечитывает изменённое окружение Compose. Для этого пересоздайте контейнеры. При обновлении настроек профиля или шаблона учтите [ревизию workflow](../integrations/mattermost/reload.md).

При неуспешной миграции изучите её ошибку до запуска приложений. Откат образа сам по себе не откатывает БД.
