
import express from "express";
import { config } from "./config/Config.js";

import projectsRouter from "./routers/Projects.js";
import registrationRouter from "./routers/Registration.js";
import  usersRouter  from "./routers/Users.js";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(express.json());
  const server = app.listen(config.serverPort, config.serverHost, () => {
    console.log(`Sever started: ${ server.address() }`);
  });

  app.use("/users", usersRouter);
  app.use("/registration", registrationRouter);
  app.use("/projects", projectsRouter);

  const users = await prisma.users.findMany();
  console.log(users);

}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


