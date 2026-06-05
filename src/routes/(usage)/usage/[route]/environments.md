---
title: Environments
description: http-client.env.json, private env files, system environment variables, and Kuba integration.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Kulala resolves variables from several sources. Understanding the order helps avoid surprises.

## Resolution order

Later sources override earlier ones:

1. `@name=value` lines in the `.http` file (file header and block preamble)
2. `http-client.env.json` and `http-client.private.env.json` (merged upward from the working directory; closest file wins)
3. `.env` files (optional, less flexible than JSON)
4. Persisted variables (global → document → request scope)
5. Magic variables (`$uuid`, `$timestamp`, …)

## http-client.env.json

Define named environments (`dev`, `staging`, `prod`, …) and Kulala extensions:

```json path=http-client.env.json
{
	"$schema": "https://getkulala.net/http-client.env.schema.json",
	"$kulalaShared": {
		"$kulalaDefaultHeaders": {
			"X-Kulala-Shared-Default-Header": "kulala-family"
		},
		"API_URL": "https://echo.kulala.app"
	},
	"default": {
		"env_name": "default"
	},
	"dev": {
		"env_name": "dev"
	},
	"staging": {
		"env_name": "staging"
	},
	"prod": {
		"$kulalaDefaultHeaders": {
			"X-Kulala-Default-Header-in-Prod": "kulala-family"
		},
		"env_name": "prod"
	}
}
```

Reference env-file variables directly: `{{API_URL}}`, `{{env_name}}`.

Store secrets in `http-client.private.env.json` (add it to `.gitignore`). Private values override the public file for the same environment key.

## System environment variables

**Important:** process environment variables use the JetBrains form `{{ $env.VAR }}`, not plain `{{VAR}}`:

```http path=system-env.http
POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{
  "kuba_env_test": "{{ $env.API_BEARER_TOKEN }}",
  "OS_USER": "{{ $env.USER }}"
}
```

Plain `{{USER}}` does **not** read from the OS environment - only `{{ $env.USER }}` does. See [Migration](/usage/migration#system-environment-variables).

## Kuba

When a `kuba.yaml` is found in a parent directory, Kulala runs `kuba show` and exposes values as `{{ $env.KEY }}` (same prefix as system env):

```http path=kuba.http
GET https://echo.kulala.app/get HTTP/1.1
Authorization: Bearer {{ $env.API_BEARER_TOKEN }}
```

## OAuth 2.0 tokens

OAuth profiles are configured in `http-client.env.json` / `http-client.private.env.json`. Use `{{$auth.token("profile-name")}}` in requests - see [Authentication](/usage/authentication).
