
import { PrismaClient } from "@prisma/client";
import { Project, T_ProjectInitParams } from "../types/Types.js";

const prisma = new PrismaClient();

class ProjectsService {
  async getAllProjects() {
    console.log(`ProjectsService.getAllProjects`)
    return prisma.projects.findMany();
  }

  async createProject(projectInitParams: T_ProjectInitParams) {
    const project = prisma.projects.create({
      data: projectInitParams
    });
    console.log(`ProjectsService.createProjects:`);

    return project;
  }

  async addTask(project: Project) {
    console.log(`ProjectsService.addTask`)
    // return prisma. ...
  }

  async getAllTasks(project: Project) {
    console.log(`ProjectsService.getAllTasks`)
    // return prisma. ...
  }

  async setProjectUser(user: any, project: Project) {
    console.log(`ProjectsService.setProjectUser`)
    // return prisma. ...
  }

  async changeStatus() {
    console.log(`ProjectsService.changeStatus`)
    // return prisma. ...
  }

  async getProjectTiming() {
    console.log(`ProjectsService.getProjectTiming`)
    // return prisma. ...
  }
}

export default new ProjectsService();
