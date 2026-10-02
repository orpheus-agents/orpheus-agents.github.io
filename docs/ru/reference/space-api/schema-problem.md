# Problem



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `error` | Да | object |  additionalProperties: <code>false</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "error"
  ],
  "properties": {
    "error": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "code",
        "message",
        "phase",
        "details"
      ],
      "properties": {
        "code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "phase": {
          "type": "string",
          "nullable": true
        },
        "details": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "path",
              "code"
            ],
            "properties": {
              "path": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
              "code": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
