# TextMessage



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `external_key` | Нет | string | Внешний ключ сообщения или события. Не уникален и не передаётся агенту. От 1 до 512 байт UTF-8. NUL и строки только из пробелов запрещены. Точное сравнение. minLength: <code>1</code><br>maxLength: <code>512</code> |
| `text` | Да | string |  minLength: <code>1</code> |
| `metadata` | Нет | object | Служебные данные интеграции, сохраняемые с сообщением. Не передаются агенту. Если поле задано, значение должно быть JSON-объектом. additionalProperties: <code>true</code> |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "external_key": {
      "description": "External message or event key; not unique and not sent to the harness. Opaque identifier, 1–512 UTF-8 bytes; no NUL or whitespace-only value. Compared exactly, without normalization.",
      "type": "string",
      "minLength": 1,
      "maxLength": 512
    },
    "text": {
      "minLength": 1,
      "title": "Text",
      "type": "string"
    },
    "metadata": {
      "description": "Opaque integration data retained with the message, never sent to the agent. If present, must be a JSON object.",
      "type": "object",
      "additionalProperties": true,
      "x-go-type": "json.RawMessage"
    }
  },
  "required": [
    "text"
  ],
  "title": "TextMessage",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
