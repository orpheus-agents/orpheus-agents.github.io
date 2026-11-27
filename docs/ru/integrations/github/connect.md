# Подключение ревью GitHub PR

Запросите ревью у технического пользователя в разделе **Reviewers**. Orpheus проверит diff,
а в GitHub появится review с построчными замечаниями. Запросите ревью повторно, чтобы проверить
новый коммит или снова проверить тот же коммит.

## Настройте доступ

1. Добавьте технического пользователя в организацию и дайте ему право **Write** в каждом
   репозитории для ревью. Передайте коннектору токен с правом **Pull requests: Read and write**
   в этих репозиториях.
2. Настройте в Orpheus профиль ревью и песочницу с Git, GitHub CLI и доступом по HTTPS.
   Песочнице нужны права на чтение содержимого репозитория и pull requests.
3. Укажите в `GITHUB_REPOSITORIES` список `owner/repo` через запятую. Все репозитории должны
   принадлежать одной организации на GitHub.com. Задайте `GITHUB_TOKEN`, `ORPHEUS_BASE_URL`
   и `ORPHEUS_API_KEY` в окружении коннектора.

См. [настройки коннектора](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.1.0/docs/configuration.md)
и [пример Compose](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.1.0/examples/compose.yaml).

## Задайте правила ревью

Начните с [workflow по умолчанию](https://github.com/orpheus-agents/orpheus-github-pr-review/blob/v0.1.0/examples/workflows/default.md).
Укажите профиль, шаблон песочницы и коды сервисов из настроек Orpheus. Добавьте под YAML правила
ревью. Workflow без `repository_ids` подходит остальным репозиториям из `GITHUB_REPOSITORIES`.
В шаблоне ошибки доступны <code v-pre>{{ .Reason }}</code> и <code v-pre>{{ .SessionURL }}</code>. После правки workflow
перезапустите коннектор.

## Проверьте на одном PR

Сделайте небольшое изменение в открытом PR и выберите технического пользователя в **Reviewers**.
По умолчанию коннектор опрашивает GitHub каждые 30 секунд. После публикации review GitHub
закроет запрос к этому пользователю. Запускайте один экземпляр коннектора на инсталляцию
Orpheus, организацию GitHub и учётную запись ревьюера.
