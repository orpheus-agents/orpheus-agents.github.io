# ToolItem



**Тип:** object

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `tool_call` | Да | [ToolCall](schema-toolcall.md) |   |
| `type` | Да | string |  const: <code>"tool_call"</code><br>default: <code>"tool_call"</code> |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
