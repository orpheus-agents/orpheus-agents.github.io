# Dashboard analytics snapshot

```http
GET /api/v1/analytics/overview
```

Counts and usage of runs accepted during [from,to), the same totals per namespace, plus current active sessions. All timestamps are UTC.

**operationId:** `get_analytics_overview`

## Authentication

HTTPBearer / BrowserSession

See [browser access](../../operations/sso.md). Session mutations require a Bearer key.

## Parameters

| Name | In | Required | Type | Description and constraints |
| --- | --- | --- | --- | --- |
| `window` | query | No | string | Server-relative sliding window. Defaults to 24h; cannot be combined with from/to. enum: <code>["24h","7d","30d"]</code> |
| `from` | query | No | string | Inclusive RFC 3339 timestamp with offset; requires to. format: <code>"date-time"</code> |
| `to` | query | No | string | Exclusive RFC 3339 timestamp with offset; requires from and cannot be later than as_of. Range at most 31 days. format: <code>"date-time"</code> |
| `bucket` | query | No | string | Local calendar hour or day; at most 800 buckets. enum: <code>["hour","day"]</code><br>default: <code>"hour"</code> |
| `timezone` | query | No | string | IANA timezone for bucket boundaries; timestamps in the response are UTC. default: <code>"UTC"</code> |
| `namespace` | query | No | string | Exact namespace match; omission includes every namespace and null. minLength: <code>1</code><br>maxLength: <code>128</code> |

## Responses

| Code | Description | Content |
| --- | --- | --- |
| 200 | Analytics snapshot | `application/json`: [AnalyticsOverview](schema-analyticsoverview.md) |
| 401 | Unauthorized | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 422 | Invalid query | `application/json`: [ErrorResponse](schema-errorresponse.md) |
| 503 | Analytics unavailable or overflow | `application/json`: [ErrorResponse](schema-errorresponse.md) |

[HTTP API](index.md)
