
import { Request, Response } from 'express';
import usersService from '../services/Users.js';

class UsersController {
  async getUserProjects(req: Request, res: Response) {
    const uid = req.params.uid;
    console.log(`GET /users/${ uid }`);

    try {
      const projects = await usersService.getUserProjects();
      res.status(200).json({
        result: `GET /users/${ uid }`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to get user projects` });
    }
  }

  async getUserTiming(req: Request, res: Response) {
    const uid = req.params.uid;
    const period = req.query.period as string;
    const project = parseInt(req.query.project as string);
    console.log(`GET /users/${ uid }/time?period=${ period }&project=${ project }`);

    try {
      const timing = await usersService.getUserTiming();
      res.status(200).json({
        result: `GET /users/${ uid }/time?period=${ period }&project=${ project }`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to get user projects` });
    }
  }
}

export default new UsersController();
