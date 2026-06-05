---
title: Response handling
description: Save responses to files, content types, and replay.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

## Save response to file

Append the response body to a file with `>>`. Use `>>!` to overwrite if the file already exists:

```http path=redirect-response-to-file.http
### REQUEST_NORMAL

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{
  "name": "Kulala-Core"
}

>> ./redirect-response-to-file.tmp.json

### REQUEST_FORCE_OVERWRITE

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: text/plain

{
  "name": "Kulala-Core"
}

>>! ./redirect-response-to-file.tmp.json
```

## Content types

Kulala handles non-standard media types in URLs and responses:

```http path=response-content-types.http
GET https://echo.kulala.app/response-headers?Content-Type=application/hal%2Bjson HTTP/1.1
```

## Replay

Named requests with timestamps or unique bodies work well with Kulala's replay/history features:

```http path=replay.http
### Replay

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

{
  "timestamp": "{{$timestamp}}",
  "message": "replay me"
}
```

Use `$kulala.request.replay()` in scripts to re-send the last request programmatically.
