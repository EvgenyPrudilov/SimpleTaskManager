
import { NextFunction, Request, Response } from 'express';
import projectService from '../services/Projects.js';
import { isGetProjectTimingParams } from '../types/ProjectsTypes.js';

const project = {
  id: 1,
  name: "name1",
  description: "description1",
  user: "user1"
}

class ProjectsController {

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async getAllProjects(req: Request, res: Response) {
    console.log(`GET /projects/`);

    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json({
        result: projects
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to get all projects` });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async createProject(req: Request, res: Response) {
    const projectCreateParams = req.body;
    console.log(`POST /projects/`);

    try {
      const project = await projectService.createProject(projectCreateParams);
      console.dir(project);
      res.status(200).json({
        result: project
      })
    } catch (error) {
      console.dir(error)
      res.status(500).json({ error: `Failed to create project` });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async addTask(req: Request, res: Response) {
    const taskCreateParams = req.body;
    console.log(`POST /projects/${ req.params.pid }/tasks`);

    try {
      const task = await projectService.addTask(taskCreateParams);
      res.status(200).json({
        result: task
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to add task to project` });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async getAllTasks(req: Request, res: Response) {
    const projectId = req.body.id;
    console.log(`GET /projects/${ req.params.pid }/tasks`);

    try {
      const tasks = await projectService.getAllTasks(projectId);
      res.status(200).json({
        result: `GET /projects/${ req.params.pid }/tasks`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to get all tasks` });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async setProjectUser(req: Request, res: Response) {
    const body = req.body;
    console.log(`PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/user`);

    try {
      const result = await projectService.setProjectUser(body);
      res.status(200).json({
        result: `PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/user`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to set project user` });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async changeStatus(req: Request, res: Response) {
    console.log(`PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/status`);

    try {
      const newStatus = await projectService.changeStatus(req.body);
      res.status(200).json({
        result: `PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/status`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to change project status` });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async getProjectTiming(req: Request, res: Response, next: NextFunction) {
    if (isGetProjectTimingParams(req.query)) {
      const body = req.query;
      console.log(`GET /projects/${ req.params.pid }/time?period=${ body.period }`);

      try {
        const projectTiming = await projectService.getProjectTiming(body);
        res.status(200).json({
          result: projectTiming
        })
      } catch (error) {
        res.status(500).json({ error: `Failed to get project timing` });
      }
    } else {
      next();
    } 
  }
}

export default new ProjectsController();
