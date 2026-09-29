# Configuration



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `agent` | Да | [AgentConfiguration](schema-agentconfiguration.md) |   |
| `hooks` | Да | [HooksConfiguration](schema-hooksconfiguration.md) |   |
| `limits` | Да | [Limits](schema-limits.md) |   |
| `sandbox` | Да | [SandboxConfiguration](schema-sandboxconfiguration.md) |   |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
