
import express from "express";
import { config } from "./config/Config.js";

import projectsRouter from "./routers/Projects.js";
import registrationRouter from "./routers/Registration.js";
import usersRouter  from "./routers/Users.js";

async function main() {
  const app = express();

  app.use(express.json());

  app.use("/users", usersRouter);
  app.use("/registration", registrationRouter);
  app.use("/projects", projectsRouter);
  app.use("auth/refresh-token", )

  const server = app.listen(config.serverPort, config.serverHost, () => {
    console.log(`Sever started: ${ server.address() }`);
  });

  
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // console.log(`disconnecting...`)
    // await prisma.$disconnect();
    // console.log(`disconnected`)
  });

//DATABASE_URL="postgresql://postgres:eugene@localhost:5432/db_task_manager?schema=public"
