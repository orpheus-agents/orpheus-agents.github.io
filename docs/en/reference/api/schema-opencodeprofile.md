# OpenCodeProfile



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `variant` | No | string | Native variant ID supported by the selected OpenCode model. minLength: <code>1</code><br>maxLength: <code>255</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "variant": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255,
      "description": "Native variant ID supported by the selected OpenCode model."
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
