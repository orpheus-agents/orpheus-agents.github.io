# ServiceCodes

Unique configured service codes. Order is insignificant; an unknown code rejects the entire request.

**Type:** array&lt;string&gt;

## JSON Schema

```json
{
  "description": "Unique configured service codes. Order is insignificant; an unknown code rejects the entire request.",
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
