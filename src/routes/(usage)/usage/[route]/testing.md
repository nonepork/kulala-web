---
title: Testing and assertions
description: IntelliJ-compatible client.test and client.assert in post-request scripts.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Kulala's testing API matches the IntelliJ HTTP Client. Define tests in post-request scripts with `client.test` and `client.assert`.

```http path=tests.http
### TEST_REQUEST1

GET https://echo.kulala.app/get
Content-Type: application/json

{
  "username": "user123",
  "password": "pass123"
}

> {%
  client.test("Request executed successfully", function() {
    client.assert(response.status === 200, "Response status is not 200");
  });

  client.test("Headers option exists", function() {
    client.assert(
      response.body.hasOwnProperty("headers"),
      "Cannot find 'headers' in parsed JSON body",
    );
  });

  client.test("Response content-type is json", function() {
    const type = response.contentType.mimeType;
    client.assert(
      type === "application/json",
      "Expected 'application/json' but received '" + type + "'",
    );
  });
%}
```

## Status code operator

Assert expected HTTP status without a script:

```http path=expect-status.http
// @kulala-expect-status-code 404

GET https://echo.kulala.app/status/404 HTTP/1.1
```

## Pre-request tests

You can also assert in pre-request scripts (e.g. variable setup):

```javascript path=pre-request-test.js
client.test('does work', () => {
	client.assert(
		request.variables.get('TYPE_FROM_JS') === 'kulala-type-from-js',
		'TYPE_FROM_JS should be set correctly'
	);
});
```

Failed assertions appear in the test report alongside `client.log` output.
