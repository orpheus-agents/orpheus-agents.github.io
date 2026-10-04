# ServiceCodes

Явный выбор кодов сервисов без значений по умолчанию. Пустой список очищает выбор. Неизвестный код возвращает 422, недоступный каталог — 503. Прежний выбор можно сохранить без каталога. Возобновление проверяет весь выбор.

**Тип:** array&lt;string&gt;

## JSON Schema

```json
{
  "description": "Explicit selection of service codes. No defaults; empty clears the selection. Unknown codes return 422 and an unavailable catalog returns 503. Unchanged selections can be preserved without the catalog; resuming validates the full selection.",
  "type": "array",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "pattern": "^[a-z][a-z0-9_-]{0,63}$"
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
