
import express from "express";
import { config } from "./config/Config.js";

import projectsRouter from "./routers/Projects.js";
import registrationRouter from "./routers/Registration.js";
import usersRouter  from "./routers/Users.js";
import authRouter from "./routers/Auth.js";

async function main() {
  const app = express();

  app.use(express.json());

  app.use("/users", usersRouter);
  app.use("/registration", registrationRouter);
  app.use("/projects", projectsRouter);
  app.use("auth/refresh-token", authRouter);

  const server = app.listen(config.serverPort, config.serverHost, () => {
    console.log(`Sever started: ${ server.address() }`);
  });

  
}

main()
