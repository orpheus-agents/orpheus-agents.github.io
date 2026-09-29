# Event



**Type:** [RunEvent](schema-runevent.md) / [MessageEvent](schema-messageevent.md) / [ToolCallEvent](schema-toolcallevent.md) / [SandboxEvent](schema-sandboxevent.md)

## JSON Schema

```json
{
  "discriminator": {
    "mapping": {
      "message.updated": "#/components/schemas/MessageEvent",
      "run.updated": "#/components/schemas/RunEvent",
      "sandbox.updated": "#/components/schemas/SandboxEvent",
      "tool_call.updated": "#/components/schemas/ToolCallEvent"
    },
    "propertyName": "type"
  },
  "oneOf": [
    {
      "$ref": "#/components/schemas/RunEvent"
    },
    {
      "$ref": "#/components/schemas/MessageEvent"
    },
    {
      "$ref": "#/components/schemas/ToolCallEvent"
    },
    {
      "$ref": "#/components/schemas/SandboxEvent"
    }
  ]
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
