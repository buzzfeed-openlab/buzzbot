
## Architecture overview

### Server (Node JS)

- Provides a webhook that Facebook posts messages to
- Serves up the admin dashboard (static react app)
- Provides a basic http api for creating messages and triggers, as well as sending messages
- Provides a websocket api for streaming messages, responses, and other data

### DB (Postgres)

- Stores all bot state
- Sends notifications to server when new responses are created

### Admin dashboard (React)

- Maintains continuous connection to server over websockets
- Posts over http to create new messages and triggers
