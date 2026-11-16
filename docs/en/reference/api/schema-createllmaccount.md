# CreateLLMAccount



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `name` | Yes | string |  minLength: <code>1</code><br>maxLength: <code>255</code> |
| `harness` | Yes | string |  enum: <code>["codex"]</code> |
| `auth_mode` | Yes | string |  enum: <code>["account","api_key"]</code> |
| `active` | No | boolean |  default: <code>true</code> |
| `credential_store` | No | string |  minLength: <code>1</code> |
| `auth_file` | No | [AuthFile](schema-authfile.md) |   |
| `api_key` | No | string |  minLength: <code>1</code> |

## JSON Schema

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": [
    "name",
    "harness",
    "auth_mode"
  ],
  "properties": {
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
      "type": "boolean",
      "default": true
    },
    "credential_store": {
      "type": "string",
      "minLength": 1
    },
    "auth_file": {
      "$ref": "#/components/schemas/AuthFile"
    },
    "api_key": {
      "type": "string",
      "minLength": 1,
      "writeOnly": true
    }
  },
  "x-go-type": "json.RawMessage"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
