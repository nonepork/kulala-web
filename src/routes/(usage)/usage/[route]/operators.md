---
title: Operators and curl flags
description: Request operators - timeouts, cookie jar, status assertions, and curl passthrough flags.
created: '2026-06-10'
categories:
  - examples
  - guides
  - reference
published: true
---

Operators are metadata lines starting with `# @` or `// @`. They can appear in the file header (before the first request) or inside a request block.

## Built-in operators

| Operator                            | Purpose                                             |
| ----------------------------------- | --------------------------------------------------- |
| `@kulala-expect-status-code`        | Fail if response status is not in the list          |
| `@kulala-prompt`                    | Interactive prompt (`@prompt` still works as alias) |
| `@timeout`                          | Total request timeout (`5 ms`, `5 s`)               |
| `@connection-timeout`               | Connection phase timeout                            |
| `@no-cookie-jar`                    | Do not send or store cookies for this request       |
| `@no-log`                           | Skip logging for this request                       |
| `@no-auto-encoding`                 | Disable automatic URL encoding                      |
| `@no-redirect`                      | Do not follow redirects                             |
| `@accept`                           | Response accept handling (e.g. `chunked`)           |
| `@kulala-file-contents-to-variable` | Load a file into a variable before send             |
| `@kulala-vscode-restclient-compat`  | Enable VS Code REST Client request chaining         |

## Examples

```http path=operators.http
### EXPECT_STATUS_404

// @kulala-expect-status-code 404

GET https://echo.kulala.app/status/404 HTTP/1.1

### PROMPT_REQUEST

// @kulala-prompt "What is your name?" NAME

GET https://echo.kulala.app/get?name={{NAME}} HTTP/1.1

### INSECURE_REQUEST_TIMEOUT_REQUEST

// @kulala-curl--insecure
// @timeout 5 ms

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{ "username": "user123" }

### NO_COOKIE_JAR_REQUEST

// @no-cookie-jar

GET https://echo.kulala.app/cookies HTTP/1.1

### NO_LOG_REQUEST

// @no-log

POST https://echo.kulala.app/anything HTTP/1.1
Content-Type: application/json

{ "username": "user123" }

### NO_AUTO_ENCODING_REQUEST

// @no-auto-encoding

GET https://echo.kulala.app/get?
            name=@#$somebody&
            qwerty=%40%23%24

### CONNECTION_TIMEOUT_PRIVATE_IP_NO_RESOLVE

// @kulala-curl--insecure
// @timeout 5 s
// @connection-timeout 5 s
POST https://10.77.77.77:1337/login HTTP/1.1
Content-Type: application/json

{ "username": "bar", "password": "baz" }
```

## Curl passthrough (`@kulala-curl--*`)

Pass arbitrary curl long options to the underlying curl binary. Use double dashes after `kulala-curl-`:

```http path=curl-passthrough.http
# @kulala-curl--insecure
# @kulala-curl--connect-timeout 5
# @kulala-curl--max-time 5

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{ "username": "user123" }
```

Short single-letter flags use one dash: `// @kulala-curl-k` → `-k`.

> **Migration note:** Older Kulala docs used `# @curl-insecure`, `# @curl-location`, etc. In kulala-core these are replaced by `# @kulala-curl--insecure`, `# @kulala-curl--location`, and so on. See [Migration](/usage/migration#curl-operator-prefix).
