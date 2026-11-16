# UpdateProfile



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `account_id` | No | string |  format: <code>"uuid"</code> |
| `description` | No | string / null |  maxLength: <code>4096</code> |
| `model` | No | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `instructions` | No | string |  maxLength: <code>65536</code> |
| `codex` | No | object / null |  additionalProperties: <code>false</code> |
| `active` | No | boolean |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [],
  "properties": {
    "account_id": {
      "type": "string",
      "format": "uuid"
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 4096
    },
    "model": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "instructions": {
      "type": "string",
      "maxLength": 65536
    },
    "codex": {
      "type": [
        "object",
        "null"
      ],
      "additionalProperties": false,
      "properties": {
        "effort": {
          "type": [
            "string",
            "null"
          ],
          "enum": [
            "none",
            "minimal",
            "low",
            "medium",
            "high",
            "xhigh",
            "max",
            "ultra",
            null
          ]
        },
        "summary": {
          "type": [
            "string",
            "null"
          ],
          "enum": [
            "auto",
            "concise",
            "detailed",
            "none",
            null
          ]
        },
        "personality": {
          "type": [
            "string",
            "null"
          ],
          "enum": [
            "none",
            "friendly",
            "pragmatic",
            null
          ]
        },
        "service_tier": {
          "type": [
            "string",
            "null"
          ],
          "minLength": 1
        }
      }
    },
    "active": {
      "type": "boolean"
    }
  },
  "x-go-type": "json.RawMessage",
  "minProperties": 1
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
