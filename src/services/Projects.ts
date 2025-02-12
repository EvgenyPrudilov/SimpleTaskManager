
import { PrismaClient, TaskStatus } from "@prisma/client";
import { 
  Enum_TimePeriod, 
  T_GetProjectTimingParams, 
  T_ProjectCreateParams, 
  T_SetTaskStatusParams, 
  T_SetTaskUserParams, 
  T_TaskCreateParams 
} from "../types/Types.js";
import { InternalServerError } from "../errors/Errors.js";

const prisma = new PrismaClient();

class ProjectsService {

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async getAllProjects() {
    console.log(`ProjectsService.getAllProjects`);
    try {
      return prisma.projects.findMany();
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async createProject(projectCreateParams: T_ProjectCreateParams) {
    try {
      const projectWithName = await prisma.projects.findUnique({
        where: { name: projectCreateParams.name }
      });
      if (projectWithName) {
        throw new Error(`A project with name "${ projectCreateParams.name }" already exists`);
      }

      const project = prisma.projects.create({
        data: projectCreateParams
      });
      console.log(`ProjectsService.createProjects:`);

      return project;
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async addTask(taskCreateParams: T_TaskCreateParams) {
    try {
      const projectWithId = await prisma.projects.findUnique({
        where: { id: taskCreateParams.projectId },
      });
      if (projectWithId === null) {
        throw new Error(`A project with ID ${ taskCreateParams.projectId } is not found`);
      }

      const taskWithName = await prisma.projects.findUnique({
        where: { name: taskCreateParams.name }
      });
      if (taskWithName) {
        throw new Error(`A task with name "${ taskCreateParams.name }" already exists`);
      }

      const task = prisma.tasks.create({
        data: {
          description: taskCreateParams.description,
          dueDate: taskCreateParams.dueDate,
          status: TaskStatus.CREATED,
          projectId: taskCreateParams.projectId
        }
      });
      console.log(`ProjectsService.addTask`)
      
      return task;
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async getAllTasks(projectId: number) {
    console.log(`ProjectsService.getAllTasks`);
    try {
      return prisma.tasks.findMany({
        where: { projectId: projectId }
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
    
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async setProjectUser(setTaskUserParams:T_SetTaskUserParams) {
    try {
      const task = await prisma.tasks.findUnique({
        where: { 
          id: setTaskUserParams.taskId,
          projectId: setTaskUserParams.projectId
        }
      });
      if (task === null) {
        throw new Error(`A task with ID ${ setTaskUserParams.taskId } and project ID ${ setTaskUserParams.projectId } is not found`);
      }

      const updatedUser  = await prisma.tasks.update({
        where: { 
          id: setTaskUserParams.taskId,
          projectId: setTaskUserParams.projectId
        }, 
        data: { assigneeId: setTaskUserParams.userId }, 
      });
      console.log(`ProjectsService.setProjectUser`);

      return updatedUser;
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async changeStatus(setTaskStatusParams: T_SetTaskStatusParams) {
    const where = { 
      id: setTaskStatusParams.taskId,
      projectId: setTaskStatusParams.projectId,
      assigneeId: setTaskStatusParams.userId
    };

    try {
      const task = await prisma.tasks.findUnique({ where });
      if (task === null) {
        throw new Error(
          `A task with ID ${ setTaskStatusParams.taskId } and project ID ${ setTaskStatusParams.projectId } is not found`
        );
      }
      
      const currentTime = new Date();
      if (task.status == TaskStatus.CREATED && setTaskStatusParams.taskStatus === TaskStatus.IN_PROGRESS) {
        const data = {
          status: setTaskStatusParams.taskStatus,
          startedAt: currentTime
        }
        return await prisma.tasks.update({ where, data });
      } 
      if (task.status == TaskStatus.IN_PROGRESS && setTaskStatusParams.taskStatus === TaskStatus.COMPLETED) {
        const data = {
          status: setTaskStatusParams.taskStatus,
          finishedAt: currentTime,
          timeUsed: currentTime.getTime() - task.startedAt!.getTime()
        }
        return await prisma.tasks.update({ where, data });
      }
      console.log(`ProjectsService.changeStatus`);
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
  }

  ///////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////

  async getProjectTiming(params: T_GetProjectTimingParams) {
    try {
      const projectWithId = await prisma.projects.findUnique({ 
        where: { 
          id: params.projectId
        } 
      });
      if (projectWithId === null) {
        throw new Error(
          `A project with ID ${ params.projectId } is not found`
        );
      }

      const currentDate = new Date();
      let result;
      
      if (params.period == Enum_TimePeriod.EVER) {
        result = await prisma.tasks.aggregate({
          _sum: { timeUsed: true },
          where: { projectId: params.projectId }
        });
      }

      if (params.period == Enum_TimePeriod.WEEK) {
        result = await prisma.tasks.aggregate({
          _sum: { timeUsed: true },
          where: { 
            projectId: params.projectId,
            startedAt: {
              gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay() - 7)
            },
        
          }
        });
      }

      if (params.period == Enum_TimePeriod.MONTH) {
        result = await prisma.tasks.aggregate({
          _sum: { timeUsed: true },
          where: { 
            projectId: params.projectId,
            startedAt: {
              gte: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDay())
            },
        
          }
        });
      }
      console.log(`ProjectsService.getProjectTiming`)

      return result;
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
  }
}

export default new ProjectsService();
