const pgp = require("pg-promise")();
require("dotenv").config();
const fs = require('fs');


const { RDS_ENDPOINT, RDS_PORT, RDS_DATABASE, RDS_USER, RDS_PASSWORD } = process.env;

const cn = {
    host: RDS_ENDPOINT,
    port: RDS_PORT,
    database: RDS_DATABASE,
    user: RDS_USER,
    password: RDS_PASSWORD,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./db/rds-ca-2019-root.pem').toString()
    }
};

const db = pgp(cn);

module.exports = db;