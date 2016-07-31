## Development quickstart for OSX

### Prereqs

- Postgres DB (`brew install postgres`, `initdb /usr/local/var/postgres`)
- Node JS ([see install instructions](https://nodejs.org/en/download/package-manager/#osx))
- Forward, or another https forwarding service ([try forward here](https://forwardhq.com/))

### Setup BuzzBot

1. `git clone git@github.com:buzzfeed-openlab/buzzbot.git && cd buzzbot`
2. `npm install`
3. `cp sample-config.js config.js` (we'll customize this more later)

### Create a database

1. `createuser --no-password buzzbot` (for development only!)
2. `createdb -O buzzbot buzzbot_development`
3. `postgres -D /usr/local/var/postgres`

### Create a Facebook App and Page

1. Instructions can be found here: https://developers.facebook.com/docs/messenger-platform/implementation#create_app_page

### Config and run

1. `export FB_PAGE_TOKEN=XXX` using the token for your Facebook page
2. `export VERIFY_TOKEN=XXX` using a secret string that only your app and Facebook will know (I recommend generating a UUID or something similar)
3. Make sure the user and database inside `./db/sequelize_config.js` match the user and database you created
4. `npm run db:init` (Creates fixtures and populates db. Done only once, manually!)
5. `npm run init` (Webpack build. While developing this will be done automatically whenever the client code changes, but in production this needs to be run for every build.)
6. `npm start`

### Verify Facebook webhook

1. Start Forward (or your https forwarding service) and create a url that forwards to `localhost:8000`
2. Go to your Facebook app dashboard (https://developers.facebook.com/apps/)
3. Configure a webhook with url from your forwarding service + `/hook/` and the `verifyToken` specified in `./config.js`
4. Verify and save


### Interact with the bot!

1. Pull up the admin dashboard at `localhost:8000/admin`
2. Start a conversation with your bot by visiting your Facebook page and clicking "message" in the top right


## Overview of npm commands

- `npm start`: Run buzzbot
- `npm run init`: Do a Webpack build of the admin dashboard code.
- `npm run db:nuke`: Drop all tables and data in the db
- `npm run db:init`: Initialize db using the models in `./db/models` and create fixtures specified in `./db/fixtures`
- `npm run migrate`: Run all migrations
- `npm run migration:create`: Create a new migration
- `npm run migration:undo`: Undo just the last migration
- `npm run migration:undo:all`: Undo all migrations

Note that there are commands for creating and running migrations, but that the existing migrations are no longer used. All models and relations are created using `sequelize.sync()`. See [here](https://stackoverflow.com/questions/21105748/sequelize-js-how-to-use-migrations-and-sync) for how that could change, but it hasn't happened yet.
