# ConfigurationInput



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `agent` | Yes | [AgentInput](schema-agentinput.md) |   |
| `hooks` | No | [HooksInput](schema-hooksinput.md) |   |
| `limits` | No | [LimitsInput](schema-limitsinput.md) |   |
| `sandbox` | Yes | [SandboxInput](schema-sandboxinput.md) |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "agent": {
      "$ref": "#/components/schemas/AgentInput"
    },
    "hooks": {
      "$ref": "#/components/schemas/HooksInput"
    },
    "limits": {
      "$ref": "#/components/schemas/LimitsInput"
    },
    "sandbox": {
      "$ref": "#/components/schemas/SandboxInput"
    }
  },
  "required": [
    "agent",
    "sandbox"
  ],
  "title": "ConfigurationInput",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
