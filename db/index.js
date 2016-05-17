import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const config = require('../config.js'),
    dbConfig = require('./sequelize_config.js')[config.env],
    basename = path.basename(module.filename),
    modelDir = path.join(__dirname, 'models');

const db = {
    Sequelize: Sequelize,
};

const dbUrl = process.env[dbConfig.useEnvVar];
if (dbUrl) {
    db.sequelize = new Sequelize(dbUrl);
} else {
    db.sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);
}

fs.readdirSync(modelDir)
    .filter((file) =>
        (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    )
    .forEach((file) => {
        const model = db.sequelize.import(path.join(modelDir, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
