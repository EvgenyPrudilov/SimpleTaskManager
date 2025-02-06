
import { PrismaClient } from "@prisma/client";
import { Project } from "../types/Types.js";

const prisma = new PrismaClient();

class ProjectsService {
  async getAllProjects() {
    console.log(`ProjectsService.getAllProjects`)
    // return prisma. ...
  }

  async createProject() {
    console.log(`ProjectsService.createProjects`)
    // return prisma. ...
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
