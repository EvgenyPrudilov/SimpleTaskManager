
import { Router } from "express";
import registrationController from '../controllers/Registration.js';

const registrationRouter = Router();
  
// POST /registration - регистрация пользователя
registrationRouter.post("/", registrationController.registerUser);

export default registrationRouter;