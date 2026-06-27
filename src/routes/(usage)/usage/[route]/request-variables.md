---
title: Request variables
description: Reference prior named requests - response body, headers, and cookies with JSONPath.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

When a request is named with `### REQUEST_NAME`, later requests can reference its request or response data.

## Syntax

```
{{REQUEST_NAME.(response|request).(body|headers).(JSONPath|header name)}}
```

- **Body:** use JSONPath after `body.` - e.g. `$.id`, `$.json.token`, `$.json.token[0]`
- **Headers:** `{{REQUEST_NAME.response.headers.Date}}` or `{{REQUEST_NAME.response.headers['Date']}}`
- **Cookies:** `{{REQUEST_NAME.response.cookies.CookieName.value}}`

Run the source request first so its response is available. Kulala persists the latest response per named request in the document store.

## VS Code REST Client chaining

If you migrated from the VS Code REST Client extension, enable the compat flag at the top of the file:

```http path=vscode-restclient-compat.http
# @kulala-vscode-restclient-compat

### REQUEST_ONE

POST https://echo.kulala.app/post HTTP/1.1
Accept: application/json
Content-Type: application/json

{
  "token": "foobar"
}

### REQUEST_TWO
POST https://echo.kulala.app/post HTTP/1.1
Accept: application/json
Content-Type: application/json

{
  "token": "{{REQUEST_ONE.response.body.$.json.token}}"
}

###

POST https://echo.kulala.app/post HTTP/1.1
Accept: application/json
Content-Type: application/json

{
  "date_header": "{{REQUEST_TWO.response.headers['Date']}}"
}
```

Without `# @kulala-vscode-restclient-compat`, `{{REQUEST_ONE.response…}}` references resolve to empty strings. The flag propagates through `import` and `run` from the source file.

See [Migration](/usage/migration#vscode-rest-client-request-chaining) for more detail.

## Token persistence example

A common pattern: fetch a token, save it to disk, reuse on the next run:

```http path=token-persistence.http
### NAMED_REQUEST_INSECURE

< {%
var fs = require('fs');
if (!fs.existsSync('TOKEN.txt')) {
  console.log('TOKEN.txt not found, requiring new token');
} else {
  console.log('TOKEN.txt found, using token from file');
}
%}

// @kulala-curl--insecure
POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json
X-Custom-Header: Kulala-Insecure

{
  "token": "some-insecure-token"
}

> ./simple.post.http.js

> {%
  const fs = require('fs');
  fs.writeFileSync('TOKEN.txt', response.body.json.token);
%}
```
