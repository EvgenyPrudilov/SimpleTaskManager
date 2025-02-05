
import { Router, Express } from "express";

export async function initRegistration(app: Express) {
  const registrationRouter = Router();
  app.use("/registration", registrationRouter);

  // POST /registration - регистрация пользователя
  registrationRouter.post("/", (req, res) => {
    console.log(`POST /registration/`);
    res.status(200).json({
      result: "POST /registration/"
    })
  });
}