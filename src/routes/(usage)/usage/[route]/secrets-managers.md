---
title: Secrets managers
description: Load credentials from 1Password CLI and KeePassXC in pre-request scripts.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Pre-request scripts can fetch secrets from external CLI tools and expose them as request variables.

## 1Password CLI

```http path=1password.http
### Javascript version

< ./1password-cli-integration.pre.js

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{
  "name": "{{ GITHUB_CREDENTIALS_FROM_OP.username }}",
  "password": "{{ GITHUB_CREDENTIALS_FROM_OP.password }}"
}
```

The pre-request script uses `spawnSync("op", …)` and caches credentials in `client.global` with a TTL keyed by environment name.

## KeePassXC CLI

```http path=keepass.http
### Javascript version

< ./keepass-xc-cli-integration.pre.js

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{
  "name": "{{ GITHUB_CREDENTIALS.username }}",
  "password": "{{ GITHUB_CREDENTIALS.password }}"
}
```

KeePassXC integration uses `$kulala.prompt()` for the database password:

```javascript path=keepass.pre.js
const KEEPASS_XC_PASSWORD_FROM_PROMPT = $kulala.prompt(
	'Password for KeePassXC database',
	'keepassxc_password',
	{ type: 'password' }
);

const result = spawnSync(
	'keepassxc-cli',
	['show', '-q', 'kulala.kdbx', `github-${CURRENT_ENV}`, '-a', 'username', '-a', 'password'],
	{ input: KEEPASS_XC_PASSWORD_FROM_PROMPT + '\n', encoding: 'utf-8' }
);
```

`request.environment.get("env_name")` reads the active environment from `http-client.env.json` so different KeePass entries can map to `dev`, `staging`, and `prod`.

## Interactive prompts

`$kulala.prompt(label, variableName, { type: "password" })` blocks the run until input is submitted - same flow as `// @kulala-prompt` operators. See [Operators](/usage/operators).
