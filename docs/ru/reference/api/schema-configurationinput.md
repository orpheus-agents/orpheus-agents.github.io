# ConfigurationInput



**Тип:** object additionalProperties: <code>false</code>

| Поле | Обязательное | Тип | Описание и ограничения |
| --- | --- | --- | --- |
| `agent` | Да | [AgentInput](schema-agentinput.md) |   |
| `hooks` | Нет | [HooksInput](schema-hooksinput.md) |   |
| `limits` | Нет | [LimitsInput](schema-limitsinput.md) |   |
| `sandbox` | Да | [SandboxInput](schema-sandboxinput.md) |   |

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

[Все схемы](schemas.md) · [HTTP API](index.md)
