---
title: WebSockets
description: Send messages over WebSocket connections with the WEBSOCKET method.
created: '2026-06-10'
categories:
  - examples
  - guides
published: true
---

WebSocket requests use `WEBSOCKET` followed by the `ws://` or `wss://` URL. The message body after a blank line is sent when the connection opens.

```http path=websocket.http
### WEBSOCKET_ECHO

WEBSOCKET wss://echo.websocket.org

{ "name": "world" }
```

Kulala keeps the connection open so you can send additional messages and read responses. In editor integrations, keybindings control send/close; in Kulala Desktop, use the WebSocket panel controls.

> **Note:** Older docs may list `WS` / `WSS` as method names. kulala-core uses `WEBSOCKET` as the method keyword with `ws://` or `wss://` in the URL.
