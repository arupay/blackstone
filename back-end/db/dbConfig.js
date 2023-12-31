// AWS RDS  CONFIGURATION Completed 11/03
const pgp = require("pg-promise")();
require("dotenv").config();
const fs = require("fs");

const isProduction = process.env.NODE_ENV === "production";

const { RDS_ENDPOINT, RDS_DATABASE, RDS_PORT, RDS_USER, RDS_PASSWORD } =
  process.env;

const cn = isProduction
  ? {
      host: RDS_ENDPOINT,
      port: RDS_PORT,
      database: RDS_DATABASE,
      user: RDS_USER,
      password: RDS_PASSWORD,
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./db/rds-ca-2019-root.pem").toString(),
      },
    }
  : {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
    };

const db = pgp(cn);

module.exports = db;
//default to postgresql on adaptable below

// const pgp = require("pg-promise")();
// require("dotenv").config();

// const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;

// const cn = DATABASE_URL
//   ? {
//       connectionString: DATABASE_URL,
//       max: 30,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     }
//   : {
//       host: PG_HOST,
//       port: PG_PORT,
//       database: PG_DATABASE,
//       user: PG_USER,
//     };

// const db = pgp(cn);

// module.exports = db;
