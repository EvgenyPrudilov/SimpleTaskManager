
import { Request, Response } from 'express';
import registrationService from '../services/Registration.js';

class RegisterController {
  async registerUser(req: Request, res: Response) {
    console.log(`POST /registration/`);
    const { name, email } = req.body;

    try {
      if (await registrationService.isEmailUsed(email)) {
        res.status(400).json({ message: "Email already in use." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to check if email is used" });
    }
    
    try {
      const { newAccessToken, newRefreshToken } = await registrationService.registerUser(name, email);
      res.status(200).json({ newAccessToken, newRefreshToken })
    } catch (error) {
      res.status(500).json({ error: "Failed to register user" });
    }
  }
}

export default new RegisterController();
