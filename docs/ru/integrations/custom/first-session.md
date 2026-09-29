# Первая сессия через API

Создание сессии сразу принимает первую задачу. Профиль [`default`](../../configuration/profiles.md) и шаблон [`codex`](../../configuration/templates.md) должны быть настроены на сервере.

<<< @/../examples/create-session.json

Здесь используется режим по умолчанию: [`allow_multiple_runs: false`](../../reference/api/create-session.md). Для простого коннектора достаточно новой сессии на каждую задачу. Для диалога с продолжением задайте `true` при создании сессии. Режим существующей сессии изменить нельзя.

Сохраните этот JSON как `request.json`. Задайте в окружении [`ORPHEUS_API_KEY`](../../reference/environment.md#env-public-api-keys) из конфигурации сервера и отправьте запрос:

```sh
curl --fail-with-body http://localhost:8000/api/v1/sessions \
  -H "Authorization: Bearer $ORPHEUS_API_KEY" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: helpdesk:ticket:4821:event:105' \
  --data-binary @request.json
```

Ответ `202 Accepted` содержит [`session_id`](../../reference/api/create-session.md), [`run_id`](../../reference/api/create-session.md) и [`message_id`](../../reference/api/create-session.md). Это подтверждение приёма, результат работы появится позже. Сохраните идентификаторы в своей системе.

[`namespace`](../../reference/api/create-session.md) объединяет сессии интеграции. [`external_key`](../../reference/api/create-session.md) связывает сессию с тикетом, но не запрещает создание нескольких сессий для одного тикета. Для повторов используйте [`Idempotency-Key`](../../reference/api/conventions.md#запросы).

Текст задачи находится в [`messages[].text`](../../reference/api/create-session.md). [`metadata`](../../reference/api/create-session.md) хранится в истории, но не передаётся агенту. Если агенту нужен номер тикета, укажите его также в тексте или инструкции.

[Метод создания сессии](../../reference/api/create-session.md) · [Получение результата](results.md)
