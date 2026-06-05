---
title: gRPC
description: Unary gRPC calls with proto imports and JSON request bodies.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

gRPC requests use the `GRPC` method line. Configure proto resolution with file-header operators, then send a JSON body matching the RPC message schema.

## Unary call

```http path=grpc.http
### GRPC_ECHO

# @grpc-import-path grpc/echopb
# @grpc-proto grpc/echopb/echo.proto
GRPC localhost:8080 grpc_echo.v1.EchoService/Echo
Content-Type: application/json

{
  "ping": "Hello, world!"
}
```

## gRPC operators

| Operator            | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| `@grpc-import-path` | Directory searched for `.proto` imports        |
| `@grpc-proto`       | Primary proto file path                        |
| `@grpc-protoset`    | Use a compiled protoset instead of proto files |
| `@grpc-plaintext`   | Disable TLS                                    |
| `@grpc-v`           | Verbose grpcurl-style logging                  |

Paths are relative to the `.http` file. Kulala uses grpcurl-compatible target parsing: `host:port package.Service/Method`.
