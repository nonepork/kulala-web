---
title: Shared blocks
description: KULALA_SHARED and KULALA_SHARED_EACH blocks for shared variables, scripts, and metadata.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Shared blocks reuse variables, operators, and scripts across many requests in a file.

## Declaring a shared block

Use `### KULALA_SHARED` or `### KULALA_SHARED_EACH` as the first named block:

| Block                | Run one request                              | Run all requests                           |
| -------------------- | -------------------------------------------- | ------------------------------------------ |
| `KULALA_SHARED`      | Shared scripts run before the target request | Shared scripts run **once** before all     |
| `KULALA_SHARED_EACH` | Shared scripts run before the target request | Shared scripts run **before each** request |

## Example structure

```http path=shared-block.http
### KULALA_SHARED

@shared_var_1 = shared_value_1
@shared_var_2 = shared_value_2

# @kulala-curl--location

< {%
  console.log("pre request shared");
%}

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{ "shared_var_1": 1 }

### request 1

@local_var_1 = local_value_1
@shared_var_2 = local_value_2

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{ "shared_var_1": 3, "shared_var_2": 4 }
```

## Shared default headers from env files

`$kulalaShared` in `http-client.env.json` can define `$kulalaDefaultHeaders` applied to every request in that environment - see [Environments](/usage/environments).

## Global headers without a full request

To share headers or post-request scripts without sending a request body, use `NOP` as the URL placeholder (JetBrains-compatible pattern).

## `$kulala.client.global.headers`

For file-scoped headers that survive one-by-one execution, prefer `$kulala.client.global.headers.set()` over `client.global.headers.set()` - see [Variables](/usage/variables#global-headers-across-requests).
