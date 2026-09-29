# Вложения и ссылки

Прикрепите документ или изображение к сообщению с задачей. Коннектор подготовит файлы перед запуском и передаст агенту пути к ним.

Для возвращаемых файлов workflow должен объяснять агенту:

```text
Read .orpheus/mattermost/current-run.json.
Move each completed output file atomically into its outbox directory.
Then send the final answer.
```

Файлы прикрепляются к последнему ответу запуска.

| Ограничение | По умолчанию |
| --- | --- |
| Файлов на сообщение | 5 |
| Обычный входящий файл | 10 MiB |
| Входящее изображение | 20 MiB |
| Входящий пакет | 100 MiB |
| Выходных файлов | 5 |
| Один выходной файл | 30 MiB |

Настройки находятся в [`files`](../../reference/mattermost.md#workflow-files-max-per-post) workflow. Размер пакета нельзя увеличить свыше 100 MiB.

Ссылки на сообщения из другого канала или треда раскрываются в контекст агенту явно. По умолчанию обрабатываются до 5 ссылок и 20 сообщений. Управление: [`link_expansion.enabled`](../../reference/mattermost.md#workflow-link-expansion-enabled), [`max_links`](../../reference/mattermost.md#workflow-link-expansion-max-links), [`max_posts`](../../reference/mattermost.md#workflow-link-expansion-max-posts).

Для вложений в уточнении работающему агенту коннектору нужен [`AGENTBOX_API_KEY`](../../reference/mattermost.md#env-agentbox-api-key). Без него пакет с файлами ждёт следующего запуска. Текстовые уточнения передаются сразу. За один запуск принимается до 32 пакетов уточнений с файлами.

Если файл не удалось прочитать или доставить, проверьте доступность Mattermost из песочницы, размер файла и результат хука.
