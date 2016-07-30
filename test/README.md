## Load Testing

There are 3 main pieces:

1. The deployment your testing (the load balancer, node servers, and pg db)
2. The mock FB server (`buzzbot/test/test-server.js`)
3. The load test script (`buzzbot/test/load-test.json`)


### Initial setup

#### Start the mock FB server

- clone `buzzbot`, `cd buzzbot`, `npm install`
- `sudo node ./test/test-server.js` (it listens on 80 by default)
- make note of the mock FB url

#### Configure the buzzbot deployment

- make sure `FB_URL` is set to the mock FB url

#### Prepare to run the load test script (on your local machine)

- `npm install -g artillery`
- configure env variables `PGUSER`, `PGPASSWORD`, `PGDB`, `PGHOST` (you'll need to reset data in the db, having these set makes that easy)
- change the `target` at the top of `buzzbot/test/load-test.json` to be the deployment


### Run the test

- `cd buzzbot`
- `npm run db:nuke`
- `npm run db:init`
- `artillery run ./test/load-test.json`
