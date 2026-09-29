# Data and backups

Back up the database and configuration. Sandbox files and source-system data are outside the Orpheus PostgreSQL database.

| Preserve | Purpose |
| --- | --- |
| PostgreSQL | Sessions, runs and accepted message history |
| [`ENV_ENCRYPTION_KEY`](../reference/environment.md#env-env-encryption-key) | Decrypt stored environment values |
| [`orpheus.toml`](../configuration/profiles.md) and [workflows](../integrations/mattermost/workflow.md) | Reproduce configuration |
| Secrets and SAML files | Service connections and user sign-in |
| S3 credential store | Account-profile authentication |

## PostgreSQL backup

From the example Compose directory:

```sh
docker compose exec -T db pg_dump -U orpheus -d orpheus -Fc > orpheus.dump
```

Keep a protected copy away from the server. Test recovery into a separate empty database, not over the live database:

```sh
pg_restore --no-owner --no-acl --dbname="$RESTORE_DATABASE_URL" orpheus.dump
```

Install PostgreSQL client tools for this command. `RESTORE_DATABASE_URL` must point to a test database. Preserve the encryption key and configuration corresponding to the backup.

Restored history does not recreate a deleted sandbox. Do not run a restored worker alongside production against the same tasks. Finished documents and comments should remain in the destination system.

`docker compose down` preserves the volume. `down -v` removes it.
