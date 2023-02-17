
import { Server } from "@hapi/hapi";
const db = require("./db");
// import { routes } from "./modules/user/userRoute/routes";
import {userRoutes} from "./modules/user/userRoutes";

export const init = async () => {
  const server:Server = new Server({
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
    new userRoutes(server);
  await server.decorate("request", "database", db);

  
  server.start();
  console.log("server started at port " , server.info.uri);
};

// console.log("Server running on %s", server.info.uri);

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});


