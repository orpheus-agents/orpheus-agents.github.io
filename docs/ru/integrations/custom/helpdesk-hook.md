# Markdown-файл и after_run

Агент готовит ответ в файле, а скрипт отправляет его в хелпдеск. Токен публикации передаётся только хукам через верхнеуровневый [`env_from`](../../reference/api/create-session.md).

## Создание задачи

[`before_run`](../../configuration/hooks.md#hook-before-run) записывает путь `replies/<run_id>.md` в `reply-path.txt`. Инструкция просит агента прочитать этот путь и атомарно сохранить готовый Markdown. Отдельный путь для каждого запуска предотвращает отправку старого ответа.

<<< @/../examples/helpdesk/create.py

## Скрипт публикации

Сохраните рядом с `create.py` файл `publish.py`:

<<< @/../examples/helpdesk/publish.py

Перед запуском задайте [`ORPHEUS_URL`](../../reference/api/conventions.md) и [`ORPHEUS_API_KEY`](../../reference/environment.md#env-public-api-keys) в окружении коннектора. На worker задайте [`HELPDESK_URL`](../../configuration/secrets.md), [`HELPDESK_TOKEN`](../../configuration/secrets.md). Разрешите оба имени в [`HARNESS_ENV_ALLOWLIST`](../../reference/environment.md#env-harness-env-allowlist) API и worker. В шаблоне нужен Python 3.

Код использует условный контракт хелпдеска. Если ваша система не поддерживает `Idempotency-Key`, добавьте проверку опубликованного комментария перед повтором. Не считайте произвольный заголовок гарантией защиты от дублей.

## Проверка

Проверьте обычный ответ, отсутствие файла, пустой файл и отказ API хелпдеска. При ошибке публикации изучите результат [`after_run`](../../configuration/hooks.md#hook-after-run) в карточке запуска. Не повторяйте всю задачу вслепую: сначала выясните, был ли комментарий создан.
