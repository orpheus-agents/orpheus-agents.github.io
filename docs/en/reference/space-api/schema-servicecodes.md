# ServiceCodes

Explicit selection of service codes. No defaults; empty clears the selection. Unknown codes return 422 and an unavailable catalog returns 503. Unchanged selections can be preserved without the catalog; resuming validates the full selection.

**Type:** array&lt;string&gt;

## JSON Schema

```json
{
  "description": "Explicit selection of service codes. No defaults; empty clears the selection. Unknown codes return 422 and an unavailable catalog returns 503. Unchanged selections can be preserved without the catalog; resuming validates the full selection.",
  "type": "array",
  "uniqueItems": true,
  "items": {
    "type": "string",
    "pattern": "^[a-z][a-z0-9_-]{0,63}$"
  }
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
