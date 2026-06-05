---
title: Usage of Kulala
description: Learn how to use Kulala, the all-in-one API toolset, to streamline your API development and testing workflow.
created: '2026-06-06'
categories:
  - help
  - examples
  - guides
  - how-to
published: true
---

Kulala is a powerful API toolset that provides a comprehensive suite of features to help you develop, test, and manage your APIs efficiently.

These guides cover the `.http` file format as implemented by [kulala-core](https://github.com/mistweaverco/kulala-core). Examples are taken from the official `http-example-files` directory and cross-checked against the current parser.

## Getting started

- [Getting started](/usage/getting-started) - first requests, naming, comments
- [Migration from older Kulala docs](/usage/migration) - `@curl-*` → `@kulala-curl--*`, `{{ $env.VAR }}`, VS Code compat

## HTTP basics

- [HTTP file format](/usage/http-file-format) - request lines, versions, origin URLs
- [Variables](/usage/variables) - `@var`, prompts, JSONPath, global headers
- [Environments](/usage/environments) - `http-client.env.json`, Kuba, OAuth
- [Magic variables](/usage/magic-variables) - `$uuid`, `$timestamp`, `$date`
- [Request variables](/usage/request-variables) - chaining named requests
- [Operators and curl flags](/usage/operators) - timeouts, cookie jar, curl passthrough
- [Cookies](/usage/cookies) - jar behavior and `@no-cookie-jar`

## Composition

- [Import and run](/usage/import-and-run) - `import`, `run`, variable overrides
- [Shared blocks](/usage/shared-blocks) - `KULALA_SHARED`, `KULALA_SHARED_EACH`

## Request and response

- [Request body](/usage/request-body) - file bodies, multipart, form data
- [Response handling](/usage/response-handling) - save to file, replay

## Protocols

- [GraphQL](/usage/graphql)
- [gRPC](/usage/grpc)
- [WebSockets](/usage/websockets)

## Scripting and testing

- [Scripting](/usage/scripting) - JavaScript, TypeScript, and Lua
- [Testing and assertions](/usage/testing) - `client.test`, `client.assert`
- [Authentication](/usage/authentication) - Bearer, OAuth 2.0
- [Secrets managers](/usage/secrets-managers) - 1Password CLI, KeePassXC
