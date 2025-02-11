
import { PrismaClient } from '@prisma/client';
import { config } from '../config/Config.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


class RegistrationService {
  async registerUser(name: string, email: string) {
    const user = await prisma.users.create({
      data: { name, email, token: "empty" }
    });

    const access_token = jwt.sign(
      { id: user.id }, config.jwtSecret, { expiresIn: "1d" }
    );
    const refresh_token = jwt.sign(
      { id: user.id }, config.jwtRefreshSecret, { expiresIn: "30d" }
    );
     
    const updatedUser  = await prisma.users.update({
      where: { id: user.id }, 
      data: { token: refresh_token }, 
    });

    console.log(`users:`);
    console.dir(await prisma.users.findMany());
    console.log(`last access token: ${ access_token }`)
    
    return { user: updatedUser, access_token, refresh_token };
  }

  async isEmailUsed(email: string): Promise<any> {
    return await prisma.users.findUnique({
      where: { email },
    });
  }

  
}

export default new RegistrationService();

