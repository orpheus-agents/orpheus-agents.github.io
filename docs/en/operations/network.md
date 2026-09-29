# Domain, HTTPS and API access

The web container serves the site and proxies `/api/`, `/auth/` and `/saml/` to Orpheus. The browser uses one origin. Set `ORPHEUS_UPSTREAM` on web to the internal API origin without a path suffix.

## Connect a domain

1. Point a DNS name such as `orpheus.example.com` to your server.
2. Issue a TLS certificate on your reverse proxy.
3. Proxy the entire site to web, `127.0.0.1:8085` in the example stack.
4. Preserve Host, Origin, Cookie and Set-Cookie headers.
5. Disable SSE buffering and allow long-lived connections.
6. Configure SSO before granting employee access.

Key nginx location settings:

```nginx
location / {
    proxy_pass http://127.0.0.1:8085;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;
    proxy_read_timeout 3600s;
}
```

This fragment belongs in an existing nginx HTTPS server. Configure TLS and certificates separately.

API keys are service credentials. Do not embed a shared Bearer token in browser JavaScript or inject it through a browser-facing proxy. Give connectors separate access to the internal API where appropriate.

System port 9100 and PostgreSQL do not need public access. Session read access depends on the [browser authentication mode](sso.md).
