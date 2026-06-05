---
title: Variables
description: Document variables, prompts, JSONPath iteration, and global headers in Kulala HTTP files.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Variables let you reuse values across headers, URLs, and bodies. Kulala supports several kinds, merged in a defined order (later sources override earlier ones).

## Document variables (`@name=value`)

Declare variables before the first `###` or in a block preamble. Reference them with `{{name}}`:

```http path=document-variables.http
@DOC_ENV_TEST=production

### JS_SCRIPT_REQ

GET https://echo.kulala.app/get HTTP/1.1
Content-Type: application/json

{
  "doc_env_test": "{{ DOC_ENV_TEST }}"
}
```

## Prompt variables

Ask for a value at run time with `@kulala-prompt` (or the legacy `@prompt` alias):

```http path=prompt.http
### PROMPT_REQUEST

// @kulala-prompt "What is your name?" NAME

GET https://echo.kulala.app/get?name={{NAME}} HTTP/1.1
```

## JSONPath and collection iteration

Set an array in a pre-request script, then expand it in the URL or body with `[*]`:

```http path=collection-iteration.http
### Iterate over arrays

< {%
  request.variables.set("users", [
    { name: "Alice" },
    { name: "Bob" },
  ])
%}

GET https://echo.kulala.app/get?user={{users[*].name}} HTTP/1.1
Content-Type: application/json
```

The same pattern works from JavaScript pre-request scripts:

```http path=scripts-variables.http
< ./scripts.pre.http.js

GET https://echo.kulala.app/get?user={{users_from_js[*].name}}&type={{ TYPE_FROM_JS }} HTTP/1.1
Content-Type: application/json
X-Header-From-JS: {{ HEADER_VALUE_FROM_JS }}
```

## Global headers across requests

JetBrains `client.global.headers.set()` only applies when you run all requests in one flow. Kulala adds `$kulala.client.global.headers.set()` so headers persist when you run requests one by one in the same file:

```http path=shared-headers.http
### First

< {%
  $kulala.client.global.headers.set("X-Kulala", "Family");
%}

GET https://echo.kulala.app/get HTTP/1.1

### Second

GET https://echo.kulala.app/get HTTP/1.1

### Third

GET https://echo.kulala.app/get HTTP/1.1
```

## Cross-request variables

To reference a prior named request's response (e.g. `{{LOGIN.response.body.$.token}}`), see [Request variables](/usage/request-variables). That requires either JetBrains-style implicit chaining or the [VS Code REST Client compat flag](/usage/migration#vscode-rest-client-request-chaining).

## Magic variables

Built-in dynamic values like `{{$uuid}}` and `{{$timestamp}}` are documented in [Magic variables](/usage/magic-variables).
