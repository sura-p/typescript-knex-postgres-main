import * as JWT from "jsonwebtoken";
import * as bcrypt from "bcryptjs"
import { Request, ResponseToolkit } from "@hapi/hapi";
import { USER_MSG } from "../../commonConstants/commonContants";
import { knexConfig } from "../../db";
import { User } from "../../modelsTypes/databaseTypes";


export class userController {
  constructor() {}
  public signIn = async (request, h: ResponseToolkit) => {
    try {
      console.log(request.payload.username);

      const users = await knexConfig<User>("user").where(
        "username",
        request.payload.username
      );
      console.log("user", users[0]);

      if (users.length < 1) {
        return h
          .response({ message: JSON.stringify(USER_MSG.USER_NOT_FOUND), users })
          .code(400);
      }
      if (!bcrypt.compareSync(request.payload.password, users[0].password)) {
        return h.response({
          message: JSON.stringify(USER_MSG.USER_CRED),
        });
      }

      request.cookieAuth.set(request.payload);
      return h
        .response({
          message: JSON.stringify(USER_MSG.SIGNUP.replace("{MSG}", "SignIn")),
        })
        .code(200);
    } catch (error) {
      console.log(error);
      return h
        .response({ message: JSON.stringify(USER_MSG.SERVER_500) })
        .code(500);
    }
  };

  public signUp = async (request, h) => {
    try {
      const { username, password } = request.payload;
      const ruser = await knexConfig("user").where("username", username);
      console.log(ruser);
      if (ruser.length < 1) {
        var salt = bcrypt.genSaltSync(10);
        request.payload.password = bcrypt.hashSync(
          request.payload.password,
          salt
        );
        console.log(request.payload);

        request.cookieAuth.set(request.payload);

        const user = await knexConfig("user").insert(request.payload);
        console.log(user);
        return h
          .response({ message: USER_MSG.SIGNUP.replace("{MSG}", "SignUP") })
          .code(200);
      } else {
        return h.response(JSON.stringify(USER_MSG.ALREADY_EXIST)).code(400);
      }
    } catch (error) {
      console.log(error);
      return h
        .response({ message: JSON.stringify(USER_MSG.SERVER_500) })
        .code(500);
    }
  };

  public userList = async (request, h: ResponseToolkit) => {
    try {
      if (request.auth.isAuthenticated) {
        console.log(request.auth.isAuthenticated);

        const users = await knexConfig("user").select("username");
        return h
          .response({
            message: JSON.stringify(USER_MSG.USER_LIST),
            data: users,
          })
          .code(200);
      } else {
        console.log(request.auth);

        return h
          .response({ message: JSON.stringify(USER_MSG.SESSION) })
          .code(400);
      }
    } catch (error) {
      console.log(error);
      return h
        .response({ message: JSON.stringify(USER_MSG.SERVER_500) })
        .code(500);
    }
  };
  public logout = async (request, h: ResponseToolkit) => {
    try {
      request.cookieAuth.clear();
      return h.response({ message: JSON.stringify(USER_MSG.LOGOUT) }).code(200);
    } catch (error) {
      console.log(error);
      return h
        .response({ message: JSON.stringify(USER_MSG.SERVER_500) })
        .code(500);
    }
  };
}
