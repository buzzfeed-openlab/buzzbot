import fs from 'fs';
import path from 'path';
import pg from 'pg';
import Sequelize from 'sequelize';
import Controller from './controller';

const config = require('../config.js'),
    dbConfig = require('./sequelize_config.js')[config.env],
    basename = path.basename(module.filename),
    modelDir = path.join(__dirname, 'models');

const db = {
    Sequelize,
};

var dbUrl = process.env[dbConfig.useEnvVar];
if (dbUrl) {
    db.sequelize = new Sequelize(dbUrl);
    db.pg = new pg.Client(dbUrl);
} else {
    db.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

    dbUrl = 'postgres://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.host + '/' + dbConfig.database;
    db.pg = new pg.Client(dbUrl);
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

db.Controller = Controller(db);

module.exports = db;
