import { Server } from "@hapi/hapi";
import { userController } from "./authController";
const Joi = require("joi");

export class userRoutes {
  protected userController = new userController();
 
  constructor(userRoute) {
    userRoute = userRoute;
    userRoute.route({
      method: "POST", // Method of the route
      path: "/signin", // Path of the route
      handler: this.userController.signIn, // Handler aka controller of the route
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
      path: "/signup", // Path of the route
      handler: this.userController.signUp,
    });

    userRoute.route({
      method: "GET",
      path: "/userlist", // Path of the route
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

