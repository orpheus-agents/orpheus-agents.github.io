# ErrorDetail

Validation paths start with body, header, query, or path. Hook execution errors identify configuration.hooks.&lt;name&gt;; codes never contain input values or native validator messages.

**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `code` | Yes | string |  enum: <code>["required","invalid_type","invalid_value","unknown_field"]</code> |
| `path` | Yes | array&lt;string / integer&gt; |   |

## JSON Schema

```json
{
  "description": "Validation paths start with body, header, query, or path. Hook execution errors identify configuration.hooks.<name>; codes never contain input values or native validator messages.",
  "properties": {
    "code": {
      "enum": [
        "required",
        "invalid_type",
        "invalid_value",
        "unknown_field"
      ],
      "title": "Code",
      "type": "string"
    },
    "path": {
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "type": "integer"
          }
        ]
      },
      "title": "Path",
      "type": "array"
    }
  },
  "required": [
    "path",
    "code"
  ],
  "title": "ErrorDetail",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
