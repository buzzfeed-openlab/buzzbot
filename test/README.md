## Load Testing

There are 3 main pieces:

1. The deployment your testing (the load balancer, node servers, and pg db)
2. The mock FB server (`convention-bot/test/test-server.js`)
3. The load test script (`convention-bot/test/load-test.json`)


### Initial setup

#### Start the mock FB server

- clone `convention-bot`, `cd convention-bot`, `npm install`
- `sudo node ./test/test-server.js` (it listens on 80 by default)
- make note of the mock FB url

#### Configure the convention-bot deployment

- make sure `FB_URL` is set to the mock FB url

#### Prepare to run the load test script (on your local machine)

- `npm install -g artillery`
- configure env variables `PGUSER`, `PGPASSWORD`, `PGDB`, `PGHOST` (you'll need to reset data in the db, having these set makes that easy)
- change the `target` at the top of `convention-bot/test/load-test.json` to be the deployment


### Run the test

- `cd convention-bot`
- `npm run db:nuke`
- `npm run db:init`
- `artillery run ./test/load-test.json`
