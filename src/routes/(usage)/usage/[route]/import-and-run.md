---
title: Import and run
description: Compose HTTP files with import and run - execute whole files or named requests with variable overrides.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

`import` pulls named requests from another file into the current document. `run` executes requests from imported or local files.

## Run an entire file

```http path=import-all.http
### RUN_ALL_GRAPHQL_REQUESTS

run ./graphql.http
```

## Import and run a named request

```http path=import-one.http
import ./graphql.http

### REQUEST_GQL_STARWARS_QUERY_PERSON

run #GQL_STARWARS_QUERY_PERSON

### REQUEST_GQL_STARWARS_QUERY_PLANET

run #GQL_STARWARS_QUERY_PLANET
```

## Variable overrides

Pass `@variable=value` after the request or file name:

```http path=run-with-overrides.http
import ./requests.http

run #Login (@host=example.com)

run #Login (@host=example.com, @user=userName)
```

## Nested imports

Imports can be nested: a file you import may itself `import` other files. Variables from imported files (including shared blocks) merge into the importing document's shared scope.

## Compat flags propagate

Operators in the file header - including `# @kulala-vscode-restclient-compat` and `# @kulala-curl--*` - propagate to blocks brought in via `import` and `run`.
