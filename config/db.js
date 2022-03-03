const Sequelize = require("sequelize");

const db = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    storage: "./db/db_weight.sqlite",
});

module.exports = db;