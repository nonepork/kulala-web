---
title: GraphQL
description: GraphQL requests - inline queries, external .graphql files, and variables.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

Use the `GRAPHQL` method instead of `POST`. The query goes in the body, followed by a blank line and optional variables JSON.

## Inline query with variables

```http path=graphql-inline.http
### GQL_STARWARS_QUERY_PERSON

GRAPHQL https://swapi-graphql.netlify.app/graphql HTTP/1.1
Accept: application/json

query Person($id: ID) {
  person(personID: $id) {
    name
  }
}

{
  "id": 1
}
```

## External query file

Reference a `.graphql` file with `< ./file.graphql`, then provide variables on the next block:

```http path=graphql-external.http
#### GQL_STARWARS_QUERY_FILM

GRAPHQL https://swapi-graphql.netlify.app/graphql HTTP/1.1
Accept: application/json

< ./graphql.graphql

{
  "id": 1
}
```

External file without variables:

```http path=graphql-inline-all.http
#### GQL_STARWARS_QUERY_FILM_INLINE

GRAPHQL https://swapi-graphql.netlify.app/graphql HTTP/1.1
Accept: application/json

< ./graphql-inline-all.graphql
```

## Nested sub-blocks (`####`)

Within a named `###` section, use `####` for additional GraphQL operations - useful when grouping related queries under one parent name.

## GraphQL via standard POST

You can also send GraphQL as a regular POST (e.g. for echo/testing):

```http path=graphql-as-post.http
GRAPHQL https://echo.kulala.app/post HTTP/1.1

{
  "username": "user123",
  "password": "pass123"
}
```

## Import and run

Compose GraphQL files with `import` / `run` - see [Import and run](/usage/import-and-run).
