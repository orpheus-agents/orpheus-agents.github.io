# Cancelled



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `run_id` | Yes | string |  format: <code>"uuid"</code> |
| `status` | Yes | [RunStatus](schema-runstatus.md) |   |

## JSON Schema

```json
{
  "properties": {
    "run_id": {
      "format": "uuid",
      "title": "Run Id",
      "type": "string"
    },
    "status": {
      "$ref": "#/components/schemas/RunStatus"
    }
  },
  "required": [
    "run_id",
    "status"
  ],
  "title": "Cancelled",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
