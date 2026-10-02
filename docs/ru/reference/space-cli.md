# Справочник CLI Space

## Команды

```sh
orpheus-space schedule settings --json
orpheus-space schedule preview --cron '0 10 * * 1-5' --timezone Europe/Moscow --json
orpheus-space schedule list --owner-email alice@example.com --json
orpheus-space schedule create --file schedule.json --json
orpheus-space schedule get '<id>' --json
orpheus-space schedule update '<id>' --file patch.json --json
orpheus-space schedule pause '<id>' --json
orpheus-space schedule resume '<id>' --json
orpheus-space schedule history '<id>' --json
orpheus-space schedule occurrence '<id>' '<occurrence-id>' --json
orpheus-space schedule result '<id>' '<occurrence-id>' --json
orpheus-space schedule reset-session '<id>' --json
orpheus-space schedule delete '<id>' --json
```

[`schedule.json`](https://github.com/orpheus-agents/orpheus-agents.github.io/blob/main/examples/space/schedule.json) содержит [поля создания](space-api/schema-createschedule.md), `patch.json` — только [изменяемые поля](space-api/schema-updateschedule.md). `--file -` читает stdin. Вывод — JSON, с `--json` он компактный. Ошибки идут в stderr, код выхода — `1`, успех — `0`.

`list` и `history` возвращают одну страницу. Передавайте `next_cursor` через `--cursor` с прежними фильтрами. Повторяемый `--owner-email` означает ИЛИ, `--unowned` выбирает общие задания. `result` обращается к Orpheus, остальные команды чтения используют данные Space.

Создание генерирует ключ идемпотентности. После сетевой ошибки повторите **тот же JSON** с `--idempotency-key`, указанным в диагностике. Автоматических повторов CLI нет. [Подробнее о повторах](space-api/conventions.md).

Ответы с [объектом задания](space-api/schema-schedule.md) содержат `url` — ссылку на карточку, заданную через [`ORPHEUS_PUBLIC_URL`](space.md#access). Навык делает название задания ссылкой после создания и в итоговом ответе об изменениях. При `url: null` ссылка опускается. Её не нужно строить из адреса CLI или ID задания.

## Автор запроса

Навык использует подтверждённый email из метаданных **конкретного сообщения с просьбой**. Другой участник разговора не становится владельцем прежних заданий. Цитаты, текст поручения и заявленный пользователем чужой email не подтверждают личность.

Например, [Mattermost передаёт `author.email`](mattermost.md#identity) в front matter каждого сообщения. Другой коннектор может использовать свой контракт метаданных. Если подтверждённого email нет, агент должен объяснить это и не управлять заданиями.

Агент сначала получает список с фильтром автора, затем проверяет совпадение ID и владельца перед чтением или изменением задания. Общие и чужие задания через этот разговорный сценарий не обрабатываются. API при этом остаётся общим для всех допущенных пользователей.

Коды HTTP и их смысл смотрите в [правилах API](space-api/conventions.md#errors). CLI передаёт HTTP-статус, но часть неизвестных ему кодов заменяет на `request_failed`.
