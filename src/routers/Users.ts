
import { Router } from "express";
import usersController from "../controllers/Users.js";

const usersRouter = Router();

// GET /users/:uid - получение пользователем своих проектов и задач
usersRouter.get("/:uid", usersController.getUserProjects);

// GET /users/:uid/time?period=[month|week|ever]&project=[id|name] - просмотр времени любого пользователя
usersRouter.get("/:uid/time", usersController.getUserTiming);

export default usersRouter;
