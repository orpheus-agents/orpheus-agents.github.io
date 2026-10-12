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
2. Остановите приём задач своими коннекторами. Если используете [ревью GitLab](../integrations/gitlab/operations.md), выполните `docker compose stop review` из каталога его примера. Принятые запуски продолжатся в Orpheus, публикация в GitLab возобновится после старта коннектора.
3. Дождитесь завершения активных задач Orpheus и доставки результатов Mattermost.
4. Сделайте резервную копию БД и конфигурации.
5. Измените версии образов в [`.env`](../getting-started/launch.md#заполните-настроики).
6. Остановите прикладные сервисы, скачайте образы, выполните миграции и запустите сервисы:

```sh
docker compose stop mattermost web worker api
docker compose pull
docker compose run --rm migrate
docker compose up -d --force-recreate api worker mattermost web
```

7. Проверьте [`/ready`](monitoring.md), [`/readyz`](monitoring.md), вход в web и тестовую задачу. Снимите [`draining`](../reference/mattermost.md#workflow-draining) и возобновите приём событий. Если используете коннектор GitLab, запустите его командой `docker compose up -d review` из каталога его примера.

Обычный `restart` не перечитывает изменённое окружение Compose. Для этого пересоздайте контейнеры. При обновлении настроек профиля или шаблона учтите [ревизию workflow](../integrations/mattermost/reload.md).

При неуспешной миграции изучите её ошибку до запуска приложений. Откат образа сам по себе не откатывает БД.
