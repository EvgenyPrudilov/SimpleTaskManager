
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async getUserProjects() {
    console.log(`UserService.getUserProjects`)
    // return prisma.users.create({
    //   data: { name, email }
    // });
  }

  async getUserTiming() {
    console.log(`UserService.getUserTiming`)
    // prisma.
  }
}

export default new UserService();

