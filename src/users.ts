
import { Router, Express } from "express";

export async function initUsers(app: Express) {
  const usersRouter = Router();
  app.use("/users", usersRouter);

  // GET /users/:uid - получение пользователем своих проектов и задач
  usersRouter.get("/:uid", (req, res) => {
    const uid = req.params.uid;

    console.log(`GET /users/${ uid }`);
    res.status(200).json({
      result: `GET /users/${ uid }`
    })
  });

  // GET /users/:uid/time?period=[month|week|ever]&project=[id|name] - просмотр времени любого пользователя
  usersRouter.get("/:uid/time", (req, res) => {
    const uid = req.params.uid;
    const period = req.query.period as string;
    const project = parseInt(req.query.project as string);

    console.log(`GET /users/${ uid }/time?period=${ period }&project=${ project }`);
    res.status(200).json({
      result: `GET /users/${ uid }/time?period=${ period }&project=${ project }`
    })
  });
}