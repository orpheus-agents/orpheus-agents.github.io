# ToolItem



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `tool_call` | Yes | [ToolCall](schema-toolcall.md) |   |
| `type` | Yes | string |  const: <code>"tool_call"</code><br>default: <code>"tool_call"</code> |

## JSON Schema

```json
{
  "properties": {
    "tool_call": {
      "$ref": "#/components/schemas/ToolCall"
    },
    "type": {
      "const": "tool_call",
      "default": "tool_call",
      "title": "Type",
      "type": "string"
    }
  },
  "required": [
    "tool_call",
    "type"
  ],
  "title": "ToolItem",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
