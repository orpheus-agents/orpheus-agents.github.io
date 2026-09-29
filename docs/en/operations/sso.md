# Sign in with SSO

Configure browser access on API, not web.

| [`ORPHEUS_BROWSER_AUTH`](../reference/environment.md#env-orpheus-browser-auth) | Reads | API writes |
| --- | --- | --- |
| `api_only` | Bearer key | Bearer key |
| `anonymous` | No sign-in | Bearer key |
| `saml` | SSO session or Bearer key | Bearer key |

Use `anonymous` for an isolated local stack. All users admitted through SAML share the same history. Restrict admission at the identity provider.

## Configure SAML

Supply these [environment variables](../reference/environment.md#env-orpheus-browser-auth) to API:

```dotenv
ORPHEUS_BROWSER_AUTH=saml
ORPHEUS_PUBLIC_URL=https://orpheus.example.com
SAML_SP_ENTITY_ID=orpheus-web
SAML_IDP_METADATA_FILE=/etc/orpheus/saml/idp.xml
SAML_SP_CERT_FILE=/etc/orpheus/saml/sp.crt
SAML_SP_KEY_FILE=/run/secrets/orpheus-saml.key
BROWSER_SESSION_TTL_SECONDS=43200
```

1. Create an SP certificate and matching RSA or ECDSA private key.
2. Create a SAML client at the IdP with entity ID `orpheus-web`.
3. Set ACS to [`https://orpheus.example.com/auth/callback`](../reference/api/browser-callback.md), HTTP-POST binding.
4. Validate request signatures with the SP certificate and sign responses and assertions using SHA-256.
5. Configure a stable NameID and an AuthnStatement. In Keycloak, set [`saml.authnstatement`](https://www.keycloak.org/docs/latest/server_admin/index.html#saml-clients) to `true`.
6. Export IdP metadata. Mount the XML, certificate and key into API at the configured paths.
7. Recreate API and verify sign-in. SP metadata is available at [`/saml/metadata`](../reference/api/saml-metadata.md).

[`ORPHEUS_PUBLIC_URL`](../reference/environment.md#env-orpheus-public-url) is the external HTTPS web origin without a trailing slash. The worker does not need SAML files.

Logout ends the local Orpheus session. The organization-wide IdP session remains active. [Keycloak configuration](https://www.keycloak.org/docs/latest/server_admin/index.html#saml-clients).
