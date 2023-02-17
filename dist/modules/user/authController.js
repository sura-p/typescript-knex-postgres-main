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
exports.userController = void 0;
const bcrypt = require("bcryptjs");
const commonContants_1 = require("../../commonConstants/commonContants");
const db_1 = require("../../db");
class userController {
    constructor() {
        this.signIn = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(request.payload.username);
                const users = yield (0, db_1.knexConfig)("user").where("username", request.payload.username);
                console.log("user", users[0]);
                if (users.length < 1) {
                    return h
                        .response({ message: JSON.stringify(commonContants_1.USER_MSG.USER_NOT_FOUND), users })
                        .code(400);
                }
                if (!bcrypt.compareSync(request.payload.password, users[0].password)) {
                    return h.response({
                        message: JSON.stringify(commonContants_1.USER_MSG.USER_CRED),
                    });
                }
                request.cookieAuth.set(request.payload);
                return h
                    .response({
                    message: JSON.stringify(commonContants_1.USER_MSG.SIGNUP.replace("{MSG}", "SignIn")),
                })
                    .code(200);
            }
            catch (error) {
                console.log(error);
                return h
                    .response({ message: JSON.stringify(commonContants_1.USER_MSG.SERVER_500) })
                    .code(500);
            }
        });
        this.signUp = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = request.payload;
                const ruser = yield (0, db_1.knexConfig)("user").where("username", username);
                console.log(ruser);
                if (ruser.length < 1) {
                    var salt = bcrypt.genSaltSync(10);
                    request.payload.password = bcrypt.hashSync(request.payload.password, salt);
                    console.log(request.payload);
                    request.cookieAuth.set(request.payload);
                    const user = yield (0, db_1.knexConfig)("user").insert(request.payload);
                    console.log(user);
                    return h
                        .response({ message: commonContants_1.USER_MSG.SIGNUP.replace("{MSG}", "SignUP") })
                        .code(200);
                }
                else {
                    return h.response(JSON.stringify(commonContants_1.USER_MSG.ALREADY_EXIST)).code(400);
                }
            }
            catch (error) {
                console.log(error);
                return h
                    .response({ message: JSON.stringify(commonContants_1.USER_MSG.SERVER_500) })
                    .code(500);
            }
        });
        this.userList = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.auth.isAuthenticated) {
                    console.log(request.auth.isAuthenticated);
                    const users = yield (0, db_1.knexConfig)("user").select("username");
                    return h
                        .response({
                        message: JSON.stringify(commonContants_1.USER_MSG.USER_LIST),
                        data: users,
                    })
                        .code(200);
                }
                else {
                    console.log(request.auth);
                    return h
                        .response({ message: JSON.stringify(commonContants_1.USER_MSG.SESSION) })
                        .code(400);
                }
            }
            catch (error) {
                console.log(error);
                return h
                    .response({ message: JSON.stringify(commonContants_1.USER_MSG.SERVER_500) })
                    .code(500);
            }
        });
        this.logout = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                request.cookieAuth.clear();
                return h.response({ message: JSON.stringify(commonContants_1.USER_MSG.LOGOUT) }).code(200);
            }
            catch (error) {
                console.log(error);
                return h
                    .response({ message: JSON.stringify(commonContants_1.USER_MSG.SERVER_500) })
                    .code(500);
            }
        });
    }
}
exports.userController = userController;
//# sourceMappingURL=authController.js.map