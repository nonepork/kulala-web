---
title: Request body
description: Bodies from files, multipart form data, and url-encoded content.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

## Body from file

Use `< ./path` to load the request body from a file (relative to the `.http` file):

```http path=read-body-from-file.http
### JSON_REQUEST

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: application/json

< ./read-body-from-file.json

### RAW_REQUEST

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: text/plain

< ./read-body-from-file.txt
```

## Multipart form data

### Manual boundary with file upload

```http path=multipart.http
### MULTIPART_FORM_DATA_REQ

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary-{{$timestamp}}

--boundary-{{$timestamp}}
Content-Disposition: form-data; name="first"; filename="multipart-form-data.txt"

< ./multipart-form-data.txt
--boundary-{{$timestamp}}--
```

### IntelliJ-compatible inline parts

Upload a file, inline text (creates a temp file), and close the boundary on the same line as the last file reference:

```http path=multipart-intellij.http
### MULTIPART_FORM_DATA_MULTI_FILES_INTELLILJ_COMPAT_REQ

POST https://echo.kulala.app/post HTTP/1.1
Content-Type: multipart/form-data; boundary=boundary

--boundary
Content-Disposition: form-data; name="first"; filename="multipart-form-data.txt"

< ./multipart-form-data.txt
--boundary
Content-Disposition: form-data; name="second"; filename="input-second.txt"

Text
--boundary
Content-Disposition: form-data; name="third";

< ./multipart-form-data.txt --boundary--
```

### Binary upload

```http path=multipart-image.http
POST http://localhost:3000/post HTTP/1.1
Content-Type: multipart/form-data; boundary=KULALA

--KULALA
Content-Disposition: form-data; name="title"

P
--KULALA
Content-Disposition: form-data; name="thumb"; filename="multipart-form-data.png"
Content-Type: image/png

< ./multipart-form-data.png
--KULALA--
```

## JSON without Content-Type

Kulala sends JSON bodies even when `Content-Type` is omitted:

```http path=no-content-type.http
POST https://echo.kulala.app/post HTTP/1.1

{ "foo": "bar" }
```
