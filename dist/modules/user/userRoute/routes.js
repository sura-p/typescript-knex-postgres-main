"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("@hapi/hapi");
const authController_1 = require("../authController");
const Joi = require("joi");
class userRoutes {
    constructor() {
        this.userController = new authController_1.userController();
        this.userRoute = new hapi_1.Server();
        this.userRoute.route({
            method: "POST",
            path: "/signin",
            handler: this.userController.signIn,
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().trim().required(),
                        password: Joi.string().trim().required(),
                    }),
                },
            },
        });
        this.userRoute.route({
            method: "POST",
            path: "/signup",
            handler: this.userController.signUp,
        });
        this.userRoute.route({
            method: "GET",
            path: "/userlist",
            options: {
                auth: {
                    mode: "try",
                    strategy: "session",
                },
            },
            handler: this.userController.userList,
        });
        this.userRoute.route({
            method: "GET",
            path: "/logout",
            options: {
                auth: "session",
            },
            handler: this.userController.logout,
        });
    }
}
exports.default = new userRoutes();
//# sourceMappingURL=routes.js.map