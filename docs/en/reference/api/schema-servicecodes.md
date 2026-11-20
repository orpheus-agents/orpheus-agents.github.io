# ServiceCodes

Unique service codes. Order is insignificant on input. Admission rejects unknown codes. Responses return sorted selections.

**Type:** array&lt;string&gt;

## JSON Schema

```json
{
  "description": "Unique service codes. Order is insignificant on input. Admission rejects unknown codes. Responses return sorted selections.",
  "type": "array",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "minLength": 1,
    "maxLength": 64,
    "pattern": "^[a-z][a-z0-9_-]*$"
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
