
import express from "express";
import { config } from "./config/Config.js";
import { initProjects } from "./projects.js";
import { initRegistration } from "./registration.js";
import { initUsers } from "./users.js";

async function main() {
  const app = express();
  const server = app.listen(config.serverPort, config.serverHost, () => {
    console.log(`Sever started: ${ server.address() }`);
  });

  initProjects(app);
  initRegistration(app);
  initUsers(app);
}

main();
