# CreateTemplate



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `template_name` | Да | string | Alias собственного проекта, при необходимости с префиксом team slug. Приводится к нижнему регистру. minLength: <code>1</code><br>maxLength: <code>255</code><br>pattern: <code>"^[A-Za-z0-9_-]+(/[A-Za-z0-9_-]+)?$"</code> |
| `tag` | Нет | string / null | Приводится к нижнему регистру. UUID сборки не принимается. При отсутствии или null проверяется default, но имя сохраняется без тега. minLength: <code>1</code><br>maxLength: <code>128</code><br>pattern: <code>"^[A-Za-z0-9_.-]+$"</code> |
| `description` | Нет | string / null |  maxLength: <code>4096</code> |
| `active` | Нет | boolean |  default: <code>true</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "template_name"
  ],
  "properties": {
    "template_name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255,
      "pattern": "^[A-Za-z0-9_-]+(/[A-Za-z0-9_-]+)?$",
      "description": "Own-project alias, optionally prefixed by its team slug. Normalized to lowercase."
    },
    "tag": {
      "type": [
        "string",
        "null"
      ],
      "minLength": 1,
      "maxLength": 128,
      "pattern": "^[A-Za-z0-9_.-]+$",
      "description": "Normalized to lowercase; UUID build references are rejected. Omission or null checks default but stores an untagged reference."
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "active": {
      "type": "boolean",
      "default": true
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
