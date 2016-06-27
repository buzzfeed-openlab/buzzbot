
import db from './index';

db.sequelize.query(`
    DROP FUNCTION IF EXISTS response_trigger() CASCADE;
`).spread((results, metadata) => {

    db.sequelize.drop().then(() => {
        console.log('NUKED!!!');
    });

});
