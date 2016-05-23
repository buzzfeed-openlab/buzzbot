
var sequelize_fixtures = require('sequelize-fixtures');
import db from './index'

db.sequelize.sync().then(() => {
    sequelize_fixtures.loadFiles([
        './db/fixtures/messages.js',
        './db/fixtures/tags.js',
        './db/fixtures/triggers.js'
    ], db).then(function(){
        console.log('CREATED FIXTURES!');
    });
});
