# LLMAccountDetails



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `id` | Yes | string |  format: <code>"uuid"</code> |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `harness` | Yes | string |  enum: <code>["codex"]</code> |
| `auth_mode` | Yes | string |  enum: <code>["account","api_key"]</code> |
| `active` | Yes | boolean |   |
| `credential_store` | Yes | string / null |   |
| `profiles` | Yes | array&lt;string&gt; |   |
| `api_key_mask` | Yes | string / null |   |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "id",
    "name",
    "harness",
    "auth_mode",
    "active",
    "credential_store",
    "profiles",
    "api_key_mask"
  ],
  "properties": {
    "id": {
      "type": "string",
      "format": "uuid"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 255
    },
    "harness": {
      "type": "string",
      "enum": [
        "codex"
      ]
    },
    "auth_mode": {
      "type": "string",
      "enum": [
        "account",
        "api_key"
      ]
    },
    "active": {
      "type": "boolean"
    },
    "credential_store": {
      "type": [
        "string",
        "null"
      ]
    },
    "profiles": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "api_key_mask": {
      "type": [
        "string",
        "null"
      ]
    }
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
