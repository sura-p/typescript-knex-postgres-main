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
const JWT = require("jsonwebtoken");
const db_1 = require("../../../db");
class userController {
    constructor() {
        this.signIn = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield (0, db_1.knexConfig)("user").where("username", request.payload);
                if (!users) {
                    return h.response("User not found").code(400);
                }
                const token = JWT.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: request.payload,
                }, process.env.MY_SECRET);
                request.cookieAuth.set(users);
                return h.response({ message: "signin successfull" }).code(200);
            }
            catch (error) {
                console.log(error);
                return h.response("Oops, something went wrong !").code(500);
            }
        });
        this.signUp = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = request.payload;
                const ruser = yield (0, db_1.knexConfig)("user").where("username", username);
                console.log(ruser);
                if (ruser.length < 1) {
                    request.cookieAuth.set(request.payload);
                    const user = yield (0, db_1.knexConfig)("user").insert(request.payload);
                    console.log(user);
                    return h.response({ message: "signup successfull" }).code(200);
                }
                else {
                    return h.response("username already exists").code(400);
                }
            }
            catch (error) {
                console.log(error);
                return h.response("Oops, something went wrong !").code(500);
            }
        });
        this.userList = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.auth.isAuthenticated) {
                    console.log(request.auth.isAuthenticated);
                    const users = yield (0, db_1.knexConfig)("user").select("username");
                    return h
                        .response({ message: "UserList fetched successfully", data: users })
                        .code(200);
                }
                else {
                    return h.response("Oops, session timeout !").code(400);
                }
            }
            catch (error) {
                console.log(error);
                return h.response("Oops, something went wrong !").code(500);
            }
        });
        this.logout = (request, h) => __awaiter(this, void 0, void 0, function* () {
            try {
                request.cookieAuth.clear();
                return h.response({ message: "logout successfull" }).code(200);
            }
            catch (error) {
                console.log(error);
                return h.response("Oops, something went wrong !").code(500);
            }
        });
    }
}
exports.userController = userController;
//# sourceMappingURL=authController.js.map