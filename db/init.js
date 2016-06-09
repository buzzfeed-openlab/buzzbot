
import fs from 'fs';
import db from './index';

const sequelize_fixtures = require('sequelize-fixtures');

db.sequelize.sync().then(() => {
    sequelize_fixtures.loadFiles([
        './db/fixtures/messages.js',
        './db/fixtures/tags.js',
        './db/fixtures/triggers.js',
    ], db).then(function() {
        const seqScript = fs.readFileSync('./db/scripts/init-seq-ids.sql').toString();
        const triggerScript = fs.readFileSync('./db/scripts/init-triggers.sql').toString();

        db.sequelize.query(seqScript).spread((results, metadata) => {
        db.sequelize.query(triggerScript).spread((results, metadata) => {
            console.log('CREATED FIXTURES!');
        }); });
    });
});
