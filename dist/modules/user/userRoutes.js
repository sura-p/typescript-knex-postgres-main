"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const authController_1 = require("./authController");
const Joi = require("joi");
class userRoutes {
    constructor(userRoute) {
        this.userController = new authController_1.userController();
        userRoute = userRoute;
        userRoute.route({
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
        userRoute.route({
            method: "POST",
            path: "/signup",
            handler: this.userController.signUp,
        });
        userRoute.route({
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
        userRoute.route({
            method: "GET",
            path: "/logout",
            options: {
                auth: "session",
            },
            handler: this.userController.logout,
        });
    }
}
exports.userRoutes = userRoutes;
//# sourceMappingURL=userRoutes.js.map