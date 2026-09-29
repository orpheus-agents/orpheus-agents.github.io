# Position



**Type:** object

| Field | Required | Type | Description and constraints |
| --- | --- | --- | --- |
| `item_index` | Yes | integer |   |
| `run_number` | Yes | integer |   |

## JSON Schema

```json
{
  "properties": {
    "item_index": {
      "title": "Item Index",
      "type": "integer"
    },
    "run_number": {
      "title": "Run Number",
      "type": "integer"
    }
  },
  "required": [
    "run_number",
    "item_index"
  ],
  "title": "Position",
  "type": "object"
}
```

[All schemas](schemas.md) · [HTTP API](index.md)
