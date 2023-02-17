"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knexConfig = void 0;
const knex_1 = require("knex");
const knexfile = require("./knexfile");
const env = process.env.ENV || "development";
const configOptions = knexfile[env];
exports.knexConfig = (0, knex_1.default)(configOptions);
//# sourceMappingURL=db.js.map