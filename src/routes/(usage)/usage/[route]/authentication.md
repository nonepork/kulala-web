---
title: Authentication
description: Bearer tokens, Basic auth, and OAuth 2.0 with automatic token refresh.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

## Bearer and Basic auth

Set credentials in headers. Kulala normalizes `Authorization: Basic user:pass` to base64-encoded form.

```http path=bearer.http
GET https://echo.kulala.app/bearer HTTP/1.1
Authorization: Bearer my-api-token
```

## OAuth 2.0

Define OAuth profiles in `http-client.env.json` (public settings) and `http-client.private.env.json` (client secrets, tokens). Reference a profile by name:

```http path=oauth2.http
### GET_DATA_WITH_SCOPES

# Step 3: Use Refresh Token (automatic)
# If the access token expires, Kulala will automatically refresh it
# using the refresh_token (if available) before making this request

POST https://echo.kulala.app/post HTTP/1.1
Authorization: Bearer {{$auth.token("playground-oauth2")}}
Accept: application/json
```

Kulala refreshes expired access tokens before sending the request when a refresh token is configured.

## Secrets from external tools

For 1Password CLI and KeePassXC patterns, see [Secrets managers](/usage/secrets-managers).

OAuth-related curl flags (e.g. `--insecure` for local IdP) should be placed in a `### KULALA_SHARED` block when they must apply to token exchange - see [Shared blocks](/usage/shared-blocks).
