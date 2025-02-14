
import { PrismaClient } from '@prisma/client';
import { Enum_TimePeriod } from '../types/SharedTypes.js';
import { InternalServerError } from '../errors/Errors.js';
import { T_GetUserProjectsParams, T_GetUserTimingParams } from '../types/Users.js';

const prisma = new PrismaClient();

class UserService {
  async getUserProjects(params: T_GetUserProjectsParams) {
    try {
      const projects = await prisma.projects.findMany({
        where: {
          creatorId: params.userId,
        },
        include: {
          tasks: {
            select: {
              id: true,
              description: true,
              status: true
            },
          },
        },
      });
      console.log(`UserService.getUserProjects`)

      console.dir(projects[0]);
      console.dir(projects[1]);

      return projects;
    } catch (err) {
      console.error(err);
      throw new InternalServerError()
    }
  }

  async getUserTiming(params: T_GetUserTimingParams) {
    try {
      let startDate = new Date();;
      let endDate = new Date(); 
  
      if (params.period === Enum_TimePeriod.WEEK) {
        startDate.setDate(endDate.getDate() - 7); 
      } else if (params.period === Enum_TimePeriod.MONTH) {
        startDate.setMonth(endDate.getMonth() - 1); 
      } else { //params.period === Enum_TimePeriod.EVER
        startDate = new Date(0); 
      }
  
      const tasks = await prisma.tasks.findMany({
        where: {
          assigneeId: params.userId,
          projectId: params.projectId ? params.projectId : undefined,
          startedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          description: true,
          startedAt: true,
          finishedAt: true,
          timeUsed: true,
          project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      console.log("UserService.getUserTiming");
      console.dir(tasks);
  
      return tasks;
    } catch (err) {
      console.error(err);
      throw new InternalServerError();
    }
  }
}

export default new UserService();
