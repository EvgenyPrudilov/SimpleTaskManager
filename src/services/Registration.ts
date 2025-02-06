
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RegistrationService {
  async registerUser(name: string, email: string) {
    return prisma.users.create({
      data: { name, email }
    });
  }
}

export default new RegistrationService();

