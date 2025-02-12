
import { Router } from "express";
import projectController from "../controllers/Projects.js"
import VerificationMiddleware from "../middleware/Verification.js";

const projectsRouter = Router();
projectsRouter.use(VerificationMiddleware.verifyAccessToken)

// GET /projects - получение всех проектов 
projectsRouter.get("/", projectController.getAllProjects);

// POST /projects - создание проекта
projectsRouter.post("/", projectController.createProject);

// POST /projects/:pid/tasks - добавление задачи в проект
projectsRouter.post("/:pid/tasks", projectController.addTask);

// GET /projects/:pid/tasks - получение всех задач
projectsRouter.get("/:pid/tasks", projectController.getAllTasks);

// PATCH /projects/:pid/tasks/:tid/user - назначение пользователя исполнителем
projectsRouter.patch("/:pid/tasks/:tid/user", projectController.setProjectUser);

// PATCH /projects/:pid/tasks/:tis/status - изменение статуса
projectsRouter.patch("/:pid/tasks/:tid/status", projectController.changeStatus);

// GET /projects/:pid/time?period=[month|week|ever] - полное время работы над проектом
projectsRouter.get("/:pid/time", projectController.getProjectTiming);

export default projectsRouter;