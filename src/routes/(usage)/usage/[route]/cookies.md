---
title: Cookies
description: Cookie jar behavior, setting cookies, and opting out with @no-cookie-jar.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Kulala maintains a cookie jar per document. Cookies set by one request are sent automatically on later requests to matching hosts unless you opt out.

## Setting and reading cookies

```http path=cookies.http
@URL = http://localhost:3000/cookies

### NON_LOCAL_SET_COOKIE

GET https://echo.kulala.app/cookies/set/kulala/test HTTP/1.1

### NON_LOCAL_PREVENT_GET_COOKIES

// @no-cookie-jar
# Prevents the cookies set by
# NON_LOCAL_SET_COOKIE from being sent in the request

GET https://echo.kulala.app/cookies HTTP/1.1

### NON_LOCAL_GET_COOKIES
# Gets the cookies set by NON_LOCAL_SET_COOKIE

GET https://echo.kulala.app/cookies HTTP/1.1

### LOCAL_SET_COOKIE

GET {{ URL }}/set/kulala/family HTTP/1.1
Content-Type: application/json

### LOCAL_PREVENT_GET_COOKIES

// @no-cookie-jar

GET {{ URL }} HTTP/1.1
Content-Type: application/json

### LOCAL_GET_COOKIES

GET {{ URL }} HTTP/1.1
Content-Type: application/json
```

## Sending cookies manually

You can also set `Cookie` headers explicitly:

```http path=manual-cookies.http
POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json
Cookie: _ga=GA1.2.1903065019.1615319519
Cookie: NAME2=VALUE2

{
  "date": "2023-05-10"
}
```

## Referencing response cookies

In a later request, reference cookies from a named request:

```
{{SET_COOKIE_REQUEST.response.cookies.kulala.value}}
```

Request-variable chaining may require `# @kulala-vscode-restclient-compat` - see [Request variables](/usage/request-variables).
