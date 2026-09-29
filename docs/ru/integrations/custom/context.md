# Контекст, файлы и доступы

Передавайте несколько сообщений в порядке разговора. Orpheus принимает массив атомарно. Предыдущие элементы становятся контекстом, последний запускает задачу.

```json
{
  "messages": [
    {"text": "Customer: I cannot export the report."},
    {"text": "Operator: Please share the error message."},
    {"text": "Customer: Permission denied. Prepare an internal reply."}
  ]
}
```

Это фрагмент запроса [создания сессии](../../reference/api/create-session.md) или [нового запуска](../../reference/api/create-run.md). Контекст, который нужен модели, должен находиться в [`text`](../../reference/api/create-session.md). Служебные ID, версии и настройки доставки можно хранить в [`metadata`](../../reference/api/create-session.md).

## Файлы

Публичный API Orpheus принимает текст, а не бинарные вложения. При отправке запроса создания сессии песочницы ещё нет. Файлы для агента подготовьте через [`before_run`](../../configuration/hooks.md#hook-before-run): этот хук выполняется внутри готовой песочницы перед каждым запуском агента.

1. В запросе создания сессии задайте скрипт в [`configuration.hooks.before_run`](../../reference/api/create-session.md). Скрипт должен скачать вложения из вашей системы и сохранить их в рабочем каталоге.
2. Передайте скрипту ID тикета или адрес файла через верхнеуровневый [`env`](../../reference/api/create-session.md), а токен доступа — через [`env_from`](../../reference/api/create-session.md). Для следующей задачи их можно задать в [запросе нового запуска](../../reference/api/create-run.md).
3. В тексте задачи укажите, куда хук сохранит файлы. Например: «Изучи вложения в каталоге `attachments/` и подготовь ответ оператору».

Порядок первого запуска: Orpheus создаёт песочницу → хук скачивает файлы → агент начинает работу с готовыми вложениями.

## Доступы

Передайте агенту только необходимые имена из [`configuration.sandbox.env_from`](../../reference/api/create-session.md). Если публикацией управляет хук, используйте верхнеуровневый [`env_from`](../../reference/api/create-session.md) для его токена.

Не включайте ключи в текст сообщений или [`metadata`](../../reference/api/create-session.md): они попадут в историю. [Настройка секретов](../../configuration/secrets.md) объясняет передачу через worker.
