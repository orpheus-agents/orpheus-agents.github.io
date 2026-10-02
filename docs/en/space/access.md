# Access and SSO

Space authenticates users independently. Give it a separate domain and SAML client. A cookie from the Orpheus web interface does not grant Space access. Configure each application's user access in the IdP.

## Access mode

Set [`ORPHEUS_BROWSER_AUTH`](../reference/space.md#access) on the Space API.

| Mode | Browser | API key |
| --- | --- | --- |
| `api_only` | No cookie access | Read and write |
| `anonymous` | Read and write without login | Read and write |
| `saml` | Read and write after login | Read and write |

Use `anonymous` on an isolated local stack. Every admitted user and API key holder can edit all schedules, including owner emails.

[Exact API, Origin and CSRF rules](../reference/space-api/conventions.md#authentication).

## Configure SAML

Supply these [SAML settings](../reference/space.md#saml) to the Space API:

```dotenv
ORPHEUS_BROWSER_AUTH=saml
ORPHEUS_PUBLIC_URL=https://space.example.com
SAML_SP_ENTITY_ID=orpheus-space
SAML_IDP_METADATA_FILE=/etc/orpheus-space/idp.xml
SAML_SP_CERT_FILE=/etc/orpheus-space/sp.crt
SAML_SP_KEY_FILE=/run/secrets/space-sp.key
BROWSER_SESSION_TTL_SECONDS=43200
```

1. Prepare an SP certificate and its matching private key.
2. Create a separate SAML IdP client with entity ID `orpheus-space`. Admit the intended employee group.
3. Set the ACS to `https://space.example.com/auth/callback` with HTTP-POST binding.
4. Configure request signature verification with the SP certificate and SHA-256 signing of responses/assertions.
5. Configure a stable NameID and AuthnStatement, as in [Orpheus SSO setup](../operations/sso.md).
6. Supply a SAML attribute with Name or FriendlyName `email`. In Keycloak, add a User Property mapper from user property `email` to SAML attribute `email`. This prefills the owner of a new schedule.
7. Export IdP metadata, mount it along with the certificate and key in the API, then restart the API.
8. Open Space, sign in and create a paused schedule. SP metadata is available at [`/saml/metadata`](../reference/space-api/saml-metadata.md).

Space also accepts an email-format NameID. A missing or invalid email does not prevent login, but the owner stays empty. After changing the mapping, sign out of Space and sign in again to refresh the session email.

You can reuse Orpheus's SP certificate/key pair if the Space client also has it registered. Application domains, clients and browser sessions remain separate. The Space worker does not need SAML files.

## Sign out

Signing out ends the local Space session. IdP and Orpheus web-interface sessions remain active, so a subsequent login may not require a password.

Use IdP rules to change application access. Schedule owner emails and [skill instructions](cli.md) are not server permissions.
