---
title: HTTP file format
description: Kulala .http file syntax - request lines, delimiters, HTTP versions, and origin-style URLs.
created: '2026-06-10'
categories:
  - examples
  - guides
  - reference
published: true
---

Kulala follows the JetBrains HTTP Client file format with extensions for GraphQL, gRPC, and WebSockets. A file can contain multiple requests separated by `###`.

## Request line formats

**Absolute** - method, full URL, optional HTTP version:

```http path=absolute.http
GET https://echo.kulala.app/get HTTP/1.1
```

**Origin** - relative path with a `Host` header (scheme and host come from `Host`):

```http path=origin.http
@host = echo.kulala.app

GET /get HTTP/1.1
Host: {{host}}
```

Kulala normalizes `@host` when it includes a scheme:

```http path=origin-with-scheme.http
@host = https://echo.kulala.app

GET /get HTTP/1.1
Host: {{host}}
```

**Implicit first request** - content before the first `###` is a valid request (no delimiter required):

```http path=implicit-first-request.http
@MY_VAR = 123
# @kulala-curl--insecure

< {%
  request.variables.set("users", [
    { name: "Alice" },
    { name: "Bob" },
  ])
%}

GET https://echo.kulala.app/get?user={{users[*].name}} HTTP/1.1
Content-Type: application/json

### FOO

GET https://echo.kulala.app/get?var={{MY_VAR}} HTTP/1.1
```

## HTTP versions

Specify the version on the request line. Kulala supports HTTP/1.0, HTTP/1.1, and HTTP/2:

```http path=http-versions.http
### HTTP_1_0_REQUEST

GET https://echo.kulala.app/any HTTP/1.0

### HTTP_1_1_REQUEST

GET https://echo.kulala.app/any HTTP/1.1

### HTTP_2_0_REQUEST

GET https://echo.kulala.app/any HTTP/2
```

Redirect following behavior can differ by version:

```http path=redirects.http
### HTTP_1_1_REDIRECT_REQUEST

GET https://echo.kulala.app/redirect?url=/redirect?url=/any HTTP/1.1

### HTTP_2_0_REDIRECT_REQUEST

GET https://echo.kulala.app/redirect?url=/redirect?url=/any HTTP/2
```

## Request methods

Standard HTTP methods are supported (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, …). Kulala also recognizes:

| Method      | Purpose               |
| ----------- | --------------------- |
| `GRAPHQL`   | GraphQL over HTTP     |
| `GRPC`      | gRPC unary calls      |
| `WEBSOCKET` | WebSocket connections |

See [GraphQL](/usage/graphql), [gRPC](/usage/grpc), and [WebSockets](/usage/websockets) for protocol-specific syntax.

## Headers and body

Headers use `Name: value` lines after the request line. The body follows a blank line. JSON bodies work with or without an explicit `Content-Type`:

```http path=send-body-without-content-type.http
### WITH_BODY_NO_CONTENT_TYPE_REQ

POST https://echo.kulala.app/post HTTP/1.1

{ "foo": "bar" }

### WITH_BODY_AND_CONTENT_TYPE_REQ

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{ "foo": "bar" }
```

## Delimiters and naming

Use `###` to separate requests. Text after `###` becomes the request name (used for `run #NAME`, scripts, and request variables):

```http path=delimiters.http
### LOGIN_REQUEST

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{ "username": "user123" }

### COOKIE_REQUEST

POST https://echo.kulala.app/post HTTP/1.1
Cookie: NAME=VALUE

{ "date": "2023-05-10" }
```

GraphQL files can use `####` for nested sub-blocks within a named section - see [GraphQL](/usage/graphql).
