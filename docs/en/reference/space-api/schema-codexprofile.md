# CodexProfile



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `effort` | No | string |  enum: <code>["none","minimal","low","medium","high","xhigh","max","ultra"]</code> |
| `summary` | No | string |  enum: <code>["auto","concise","detailed","none"]</code> |
| `personality` | No | string |  enum: <code>["none","friendly","pragmatic"]</code> |
| `service_tier` | No | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "effort": {
      "type": "string",
      "enum": [
        "none",
        "minimal",
        "low",
        "medium",
        "high",
        "xhigh",
        "max",
        "ultra"
      ]
    },
    "summary": {
      "type": "string",
      "enum": [
        "auto",
        "concise",
        "detailed",
        "none"
      ]
    },
    "personality": {
      "type": "string",
      "enum": [
        "none",
        "friendly",
        "pragmatic"
      ]
    },
    "service_tier": {
      "type": "string",
      "minLength": 1
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
