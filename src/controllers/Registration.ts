
import { Request, Response } from 'express';
import registrationService from '../services/Registration.js';

class RegisterController {
  async registerUser(req: Request, res: Response) {
    console.dir(req.body);
    const { name, email } = req.body;

    try {
      const user = await registrationService.registerUser(name, email);
      res.status(200).json({
        result: "POST /registration/", name, email
      })
    } catch (error) {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
}

export default new RegisterController();
