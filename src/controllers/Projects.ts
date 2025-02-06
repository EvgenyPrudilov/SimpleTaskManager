
import { Request, Response } from 'express';
import projectService from '../services/Projects.js';

const project = {
  id: 1,
  name: "name1",
  description: "description1",
  user: "user1"
}

class ProjectsController {

  async getAllProjects(req: Request, res: Response) {
    console.log(`GET /projects/`);

    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json({
        result: "GET /projects/"
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to get all projects` });
    }
  }

  async createProject(req: Request, res: Response) {
    console.log(`POST /projects/`);

    try {
      const project = await projectService.createProject();
      res.status(200).json({
        result: "POST /projects/"
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to create project` });
    }
  }

  async addTask(req: Request, res: Response) {
    console.log(`POST /projects/${ req.params.pid }/tasks`);

    try {
      const task = await projectService.addTask(project);
      res.status(200).json({
        result: `POST /projects/${ req.params.pid }/tasks`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to add task to project` });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    console.log(`GET /projects/${ req.params.pid }/tasks`);

    try {
      const tasks = await projectService.getAllTasks(project);
      res.status(200).json({
      result: `GET /projects/${ req.params.pid }/tasks`
    })
    } catch (error) {
      res.status(500).json({ error: `Failed to get all tasks` });
    }
  }

  async setProjectUser(req: Request, res: Response) {
    console.log(`PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/user`);

    try {
      const result = await projectService.setProjectUser("username", project);
      res.status(200).json({
        result: `PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/user`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to set project user` });
    }
  }

  async changeStatus(req: Request, res: Response) {
    console.log(`PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/status`);

    try {
      const newStatus = await projectService.changeStatus();
      res.status(200).json({
        result: `PATCH /projects/${ req.params.pid }/tasks/${ req.params.tid }/status`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to change project status` });
    }
  }

  async getProjectTiming(req: Request, res: Response) {
    const period = req.query.period as string;
    console.log(`GET /projects/${ req.params.pid }/time?period=${ period }`);

    try {
      const projectTiming = await projectService.getProjectTiming();
      res.status(200).json({
        result: `GET /projects/${ req.params.pid }/time?period=${ period }`
      })
    } catch (error) {
      res.status(500).json({ error: `Failed to get project timing` });
    }
  }
}

export default new ProjectsController();
