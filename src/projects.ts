
import { Router, Express } from "express";

export async function initProjects(app: Express) {
  const projectsRouter = Router();
  app.use("/projects", projectsRouter);

  // GET /projects - получение всех проектов 
  projectsRouter.get("/", (req, res) => {
    console.log(`GET /projects/`);
    res.status(200).json({
      result: "GET /projects/"
    })
  });

  // POST /projects - создание проекта
  projectsRouter.post("/", (req, res) => {
    console.log(`POST /projects/`);
    res.status(200).json({
      result: "POST /projects/"
    })
  });

  // POST /projects/:pid/tasks - добавление задачи в проект
  projectsRouter.post("/:pid/tasks", (req, res) => {
    console.log(`POST /projects/${ req.params.pid }/tasks`);
    res.status(200).json({
      result: `POST /projects/${ req.params.pid }/tasks`
    })
  });
  
  // GET /projects/:pid/tasks - получение всех задач
  projectsRouter.get("/:pid/tasks", (req, res) => {
    console.log(`GET /projects/${ req.params.pid }/tasks`);
    res.status(200).json({
      result: `GET /projects/${ req.params.pid }/tasks`
    })
  });
 
  // PATCH /projects/:pid/tasks/:tid/user - назначение пользователя исполнителем
  projectsRouter.patch("/:pid/tasks/:tid/user", (req, res) => {
    console.log(`PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/user`);
    res.status(200).json({
      result: `PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/user`
    })
  });

  // PATCH /projects/:pid/tasks/:tis/status - изменение статуса
  projectsRouter.patch("/:pid/tasks/:tid/status", (req, res) => {
    console.log(`PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/status`);
    res.status(200).json({
      result: `PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/status`
    })
  });

  // GET /projects/:pid/time?period=[month|week|ever] - полное время работы над проектом
  projectsRouter.get("/:pid/time", (req, res) => {
    const period = req.query.period as string;

    console.log(`GET /projects/${ req.params.pid }/time?period=${ period }`);
    res.status(200).json({
      result: `GET /projects/${ req.params.pid }/time?period=${ period }`
    })
  });
}