# Convention Bot

## Development quickstart for OSX

### Prereqs

- Postgres DB (`brew install postgres`, `initdb /usr/local/var/postgres`)
- Node JS ([see install instructions ](https://nodejs.org/en/download/package-manager/#osx))
- Forward, or another https forwarding service ([try forward here](https://forwardhq.com/))

### Setup Convention Bot

1. `git clone git@github.com:buzzfeed-openlab/convention-bot.git && cd convention-bot`
2. `npm install`
3. `cp sample-config.js config.js` (we'll customize this more later)
4. `cp db/sample_sequelize_config.js db/sequelize_config.js` (we'll customize this more later)

### Create a database

1. `createuser --no-password conventionbot` (for development only!)
2. `createdb -O conventionbot convention_bot_development`
3. `postgres -D /usr/local/var/postgres`

### Create a Facebook App and Page

1. Instructions can be found here: https://developers.facebook.com/docs/messenger-platform/implementation#create_app_page

### Config and run

1. Change `pageToken` in `./config.js` to the token for your Facebook page
2. Change `verifyToken` in `./config.js` to a secret string that only your app and Facebook will know (I recommend generating a UUID or something similar)
3. Make sure the user and database inside `./db/sequelize_config.js` match the user and database you created
4. `npm run db:init`
5. `npm start`

### Verify Facebook webhook

1. Start Forward (or your https forwarding service) and create a url that forwards to `localhost:8000`
2. Go to your Facebook app dashboard (https://developers.facebook.com/apps/)
3. Configure a webhook with url from your forwarding service and the `verifyToken` specified in `./config.js`
4. Verify and save


### Interact with the bot!

1. Pull up the admin dashboard at `localhost:8000/`
2. Start a conversation with your bot by visiting your Facebook page and clicking "message" in the top right

## Overview of npm commands

- `npm start`: Run convention bot
- `npm run db:nuke`: Drop all tables and data in the db
- `npm run db:init`: Initialize db using the models in `./db/models` and create fixtures specified in `./db/fixtures`
- `npm run migrate`: Run all migrations
- `npm run migration:create`: Create a new migration
- `npm run migration:undo`: Undo just the last migration
- `npm run migration:undo:all`: Undo all migrations

Note that there are commands for creating and running migrations, but that the existing migrations are no longer used. All models and relations are created using `sequelize.sync()`. See [here](https://stackoverflow.com/questions/21105748/sequelize-js-how-to-use-migrations-and-sync) for how that could change, unfortunately I have not had time to do it all by hand.
