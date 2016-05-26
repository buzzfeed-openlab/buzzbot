
var sequelize_fixtures = require('sequelize-fixtures');
import db from './index'

db.sequelize.sync().then(() => {
    sequelize_fixtures.loadFiles([
        './db/fixtures/messages.js',
        './db/fixtures/tags.js',
        './db/fixtures/triggers.js'
    ], db).then(function() {
        // set automatic increment starting values
        db.sequelize.query("ALTER SEQUENCE \"Messages_id_seq\" RESTART WITH 1000;").spread(function(results, metadata) {
        db.sequelize.query("ALTER SEQUENCE \"Tags_id_seq\" RESTART WITH 1000;").spread(function(results, metadata) {
        db.sequelize.query("ALTER SEQUENCE \"Triggers_id_seq\" RESTART WITH 1000;").spread(function(results, metadata) {
            console.log('CREATED FIXTURES!');
        }); }); });
    });
});
