# Configuration



**Type:** object additionalProperties: <code>false</code>

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `agent` | Yes | [AgentConfiguration](schema-agentconfiguration.md) |   |
| `hooks` | Yes | [HooksConfiguration](schema-hooksconfiguration.md) |   |
| `limits` | Yes | [Limits](schema-limits.md) |   |
| `sandbox` | Yes | [SandboxConfiguration](schema-sandboxconfiguration.md) |   |

## JSON Schema

```json
{
  "additionalProperties": false,
  "properties": {
    "agent": {
      "$ref": "#/components/schemas/AgentConfiguration"
    },
    "hooks": {
      "$ref": "#/components/schemas/HooksConfiguration"
    },
    "limits": {
      "$ref": "#/components/schemas/Limits"
    },
    "sandbox": {
      "$ref": "#/components/schemas/SandboxConfiguration"
    }
  },
  "required": [
    "agent",
    "sandbox",
    "limits",
    "hooks"
  ],
  "title": "Configuration",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
