---
title: Scripting
description: Pre-request and post-request scripts in JavaScript, TypeScript, and Lua.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Scripts run before (`<`) or after (`>`) a request. They can be inline or external files.

## Inline JavaScript (pre-request)

```http path=inline-pre-js.http
< {%
  request.variables.set("users", [
    { name: "Alice" },
    { name: "Bob" },
  ])
%}

GET https://echo.kulala.app/get?user={{users[*].name}} HTTP/1.1
```

## External JavaScript

```http path=external-js.http
< ./scripts.pre.http.js

GET https://echo.kulala.app/get?user={{users_from_js[*].name}} HTTP/1.1
Content-Type: application/json
X-Header-From-JS: {{ HEADER_VALUE_FROM_JS }}
```

Example pre-request script:

```javascript path=scripts.pre.http.js
client.log('Current iteration from JS', request.iteration());
request.variables.set('TYPE_FROM_JS', 'kulala-type-from-js');
client.global.set('HEADER_VALUE_FROM_JS', 'header-value-from-js');
request.variables.set('users_from_js', [{ name: 'Alice' }, { name: 'Bob' }]);
```

## Inline post-request (async JavaScript)

```http path=post-js.http
GET https://echo.kulala.app/get HTTP/1.1

> {%
  async function main() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Hello from Async JavaScript!"), 10);
    });
  }
  client.log(await main());
  client.log("Status", response.status);
  client.log("Date", response.headers.valueOf("Date") || "");
%}
```

## Lua scripts

Use `{% lang=lua … %}` for inline Lua:

```http path=lua-script.http
< {% lang=lua
  client.log("Current iteration from Lua", request.iteration())
  request.variables.set("TYPE_FROM_LUA", "kulala-type-from-lua")
  client.global.set("HEADER_VALUE_FROM_LUA", "header-value-from-lua")
  request.variables.set("users_from_lua", {
    { name = "Alice" },
    { name = "Bob" },
  })
%}

GET https://echo.kulala.app/get?user={{users_from_lua[*].name}} HTTP/1.1
X-Header-From-Lua: {{ HEADER_VALUE_FROM_LUA }}
```

## Script APIs

| Object     | Key methods                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| `client`   | `log`, `test`, `assert`, `global.set/get`, `exit`                           |
| `request`  | `variables.set/get`, `iteration()`, `environment.get`, `skip()`, `replay()` |
| `response` | `status`, `body`, `headers`, `contentType`, `cookies`                       |
| `$kulala`  | `prompt()`, `client.global.headers.set()`, `request.replay()`               |

Variables set with `client.global` persist in kulala-core's SQLite store across runs.

## Error semantics

- **Pre-request script errors** abort the request (nothing is sent).
- **Post-request script errors** keep the HTTP response; the script failure is reported separately.

## Node.js in scripts

JavaScript scripts can `require('fs')`, `require('child_process')`, and npm packages when configured. See [Secrets managers](/usage/secrets-managers) for `spawnSync` examples.
