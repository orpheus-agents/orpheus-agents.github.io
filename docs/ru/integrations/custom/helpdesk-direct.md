# Агент публикует комментарий

Коннектор создаёт сессию по новому тикету. Агент получает токен хелпдеска и инструкцию публикации.

Настройте [сервис `helpdesk`](../../configuration/secrets.md#services) на API и worker, а значения его `HELPDESK_URL` и `HELPDESK_TOKEN` передайте worker. В запросе выберите сервис:

```json
{
  "agent": {
    "profile": "default",
    "instructions": "Read ticket 4821 using HELPDESK_URL and HELPDESK_TOKEN. Investigate the issue. POST an internal comment to /tickets/4821/comments with JSON fields body and internal=true. Include the likely cause, checks and a draft reply. Do not contact the customer or close the ticket."
  },
  "sandbox": {
    "template": "codex",
    "services": ["helpdesk"]
  }
}
```

Это значение [`configuration`](../../reference/api/create-session.md) запроса [создания сессии](first-session.md). В [`messages`](../../reference/api/create-session.md) передайте текст обращения. Для реальной интеграции подставляйте ID тикета из события и давайте агенту краткое описание доступного API или CLI.

## Проверка

1. Создайте тестовый тикет.
2. Проверьте вызов API хелпдеска в истории инструментов.
3. Убедитесь, что комментарий внутренний и появился в правильном тикете.
4. Повторно доставьте исходное событие с тем же ключом идемпотентности. Новая задача не должна появиться.

Агент имеет возможность использовать выданный токен. Ограничьте его права нужными операциями. Если требуется фиксированный алгоритм публикации, используйте [after_run](helpdesk-hook.md).
