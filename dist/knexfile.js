"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
console.log("env", process.env["DB_URL"]);
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "pg",
        connection: "postgres://pgadmin:Suraj@123@127.0.0.1:5432/testdb",
        migrations: {
            directory: "./dist/migrations",
            extension: "ts",
        },
        seeds: { directory: "./dist/seeds" },
    },
    testing: {
        client: "pg",
        connection: process.env.DB_URL,
        migrations: {
            directory: "./dist/migrations",
        },
        seeds: { directory: "./dist/seeds" },
    },
    production: {
        client: "pg",
        connection: process.env.DB_URL,
        migrations: {
            directory: "./dist/migrations",
        },
        seeds: { directory: "./dist/seeds" },
    },
};
//# sourceMappingURL=knexfile.js.map