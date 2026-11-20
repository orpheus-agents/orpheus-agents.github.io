# ServiceCodes

Уникальные коды сервисов. Порядок при передаче произвольный. API отклоняет неизвестный код и возвращает выбранные коды в отсортированном виде.

**Тип:** array&lt;string&gt;

## JSON Schema

```json
{
  "description": "Unique service codes. Order is insignificant on input. Admission rejects unknown codes. Responses return sorted selections.",
  "type": "array",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "minLength": 1,
    "maxLength": 64,
    "pattern": "^[a-z][a-z0-9_-]*$"
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
