import  knex from "knex";

import * as  knexfile from "./knexfile";
const env = process.env.ENV || "development";
const configOptions = knexfile[env];
export const knexConfig =  knex(configOptions);
