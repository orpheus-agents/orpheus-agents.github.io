# PreviewInput



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `cron` | Yes | string |  minLength: <code>1</code> |
| `timezone` | Yes | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "cron",
    "timezone"
  ],
  "properties": {
    "cron": {
      "type": "string",
      "minLength": 1
    },
    "timezone": {
      "type": "string",
      "minLength": 1
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
