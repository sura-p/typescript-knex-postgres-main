"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const hapi_1 = require("@hapi/hapi");
const db = require("./db");
// import { routes } from "./modules/user/userRoute/routes";
const userRoutes_1 = require("./modules/user/userRoutes");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        port: 4000,
        host: "localhost",
    });
    server.register({
        plugin: require("@hapi/cookie"),
    });
    server.auth.strategy("session", "cookie", {
        cookie: {
            name: "access_token",
            password: process.env.MY_SECRET,
            isSecure: false,
            ttl: 30 * 60,
        },
    });
    new userRoutes_1.userRoutes(server);
    yield server.decorate("request", "database", db);
    server.start();
    console.log("server started at port ", server.info.uri);
});
exports.init = init;
// console.log("Server running on %s", server.info.uri);
process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=app.js.map