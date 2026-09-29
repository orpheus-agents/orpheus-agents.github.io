# ToolResult



**Type:** [TextResult](schema-textresult.md) / [JSONResult](schema-jsonresult.md) / [TruncatedResult](schema-truncatedresult.md)

## JSON Schema

```json
{
  "discriminator": {
    "mapping": {
      "json": "#/components/schemas/JSONResult",
      "text": "#/components/schemas/TextResult",
      "truncated_text": "#/components/schemas/TruncatedResult"
    },
    "propertyName": "type"
  },
  "oneOf": [
    {
      "$ref": "#/components/schemas/TextResult"
    },
    {
      "$ref": "#/components/schemas/JSONResult"
    },
    {
      "$ref": "#/components/schemas/TruncatedResult"
    }
  ]
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
