const pgp = require("pg-promise")();
require("dotenv").config();
const fs = require('fs');


const isProduction = process.env.NODE_ENV === 'development';

const cn = isProduction ? {
    host: RDS_ENDPOINT,
    port: RDS_PORT,
    database: RDS_DATABASE,
    user: RDS_USER,
    password: RDS_PASSWORD,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./db/rds-ca-2019-root.pem').toString()
    }
} : {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
};

const db = pgp(cn);

module.exports = db;
