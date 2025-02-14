
import { NextFunction, Request, Response } from 'express';
import usersService from '../services/Users.js';
import { isGetUserProjectsParams, isGetUserTimingParams } from '../types/UsersTypes.js';
import { periodMap } from '../Shared.js';

class UsersController {
  async getUserProjects(req: Request, res: Response, next: NextFunction) {
    const serviceParams = {
      userId: parseInt(req.params.uid)
    }
    console.log(`GET /users/${ serviceParams.userId }`);

    if (isGetUserProjectsParams(serviceParams)) {
      try {
        const projects = await usersService.getUserProjects(serviceParams);
        res.status(200).json({
          result: `GET /users/${ serviceParams.userId }`
        })
      } catch (error) {
        res.status(500).json({ error: `Failed to get user projects` });
      }
    } else {
      next();
    }
  }

  async getUserTiming(req: Request, res: Response, next: NextFunction) {
    const serviceParams = {
      userId: parseInt(req.params.uid),
      period: (typeof req.query.period === "string") ? periodMap[req.query.period] : periodMap["ever"],
      projectId: (typeof req.query.project === "string") ? parseInt(req.query.project) : undefined
    }
    console.log(`GET /users/${ serviceParams.userId }/time?period=${ serviceParams.period }&project=${ serviceParams.projectId }`);

    if (isGetUserTimingParams(serviceParams)) {
      try {
        const timing = await usersService.getUserTiming(serviceParams);

        res.status(200).json({
          result: `GET /users/${ serviceParams.userId }/time?period=${ serviceParams.period }&project=${ serviceParams.projectId }`
        })
      } catch (error) {
        res.status(500).json({ error: `Failed to get user projects` });
      }
    } else {
      next();
    }
  }
}

export default new UsersController();
