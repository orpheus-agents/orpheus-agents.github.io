# ToolCall



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `created_at` | Да | string |  format: <code>"date-time"</code> |
| `id` | Да | string |  format: <code>"uuid"</code> |
| `input` | Да | any |   |
| `name` | Да | string |   |
| `output_completeness` | Да | string |  enum: <code>["complete","truncated","unavailable","unknown"]</code> |
| `position` | Да | [Position](schema-position.md) / null |   |
| `registered_sequence` | Да | string |   |
| `result` | Да | [ToolResult](schema-toolresult.md) / null |   |
| `run_id` | Да | string |  format: <code>"uuid"</code> |
| `session_id` | Да | string |  format: <code>"uuid"</code> |
| `status` | Да | string |  enum: <code>["running","completed","failed","cancelled","unknown"]</code> |
| `truncation_reason` | Да | string / null |   |

## JSON Schema

```json
{
  "properties": {
    "created_at": {
      "format": "date-time",
      "title": "Created At",
      "type": "string"
    },
    "id": {
      "format": "uuid",
      "title": "Id",
      "type": "string"
    },
    "input": {
      "title": "Input",
      "x-go-type": "json.RawMessage"
    },
    "name": {
      "title": "Name",
      "type": "string"
    },
    "output_completeness": {
      "enum": [
        "complete",
        "truncated",
        "unavailable",
        "unknown"
      ],
      "title": "Output Completeness",
      "type": "string"
    },
    "position": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/Position"
        },
        {
          "type": "null"
        }
      ]
    },
    "registered_sequence": {
      "title": "Registered Sequence",
      "type": "string"
    },
    "result": {
      "anyOf": [
        {
          "$ref": "#/components/schemas/ToolResult"
        },
        {
          "type": "null"
        }
      ],
      "title": "Result"
    },
    "run_id": {
      "format": "uuid",
      "title": "Run Id",
      "type": "string"
    },
    "session_id": {
      "format": "uuid",
      "title": "Session Id",
      "type": "string"
    },
    "status": {
      "enum": [
        "running",
        "completed",
        "failed",
        "cancelled",
        "unknown"
      ],
      "title": "Status",
      "type": "string"
    },
    "truncation_reason": {
      "anyOf": [
        {
          "enum": [
            "orpheus_limit",
            "harness_limit"
          ],
          "type": "string"
        },
        {
          "type": "null"
        }
      ],
      "title": "Truncation Reason"
    }
  },
  "required": [
    "id",
    "session_id",
    "run_id",
    "name",
    "input",
    "status",
    "result",
    "output_completeness",
    "truncation_reason",
    "registered_sequence",
    "position",
    "created_at"
  ],
  "title": "ToolCall",
  "type": "object"
}
```

[Все схемы](schemas.md) · [HTTP API](index.md)
