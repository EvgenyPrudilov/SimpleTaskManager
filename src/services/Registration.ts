
import { PrismaClient } from '@prisma/client';
import TokensService from "./Tokens.js"

const prisma = new PrismaClient();

class RegistrationService {
  async registerUser(name: string, email: string) {
    const user = await prisma.users.create({
      data: { name, email, token: "empty" }
    });

    const payload = { id: user.id };
    const { newAccessToken, newRefreshToken } = TokensService.getNewTokens(payload, payload)
    // const access_token = jwt.sign(
    //   { id: user.id }, config.jwtSecret, { expiresIn: "1d" }
    // );
    // const refresh_token = jwt.sign(
    //   { id: user.id }, config.jwtRefreshSecret, { expiresIn: "30d" }
    // );
     
    const updatedUser  = await prisma.users.update({
      where: { id: user.id }, 
      data: { token: newRefreshToken }, 
    });

    console.log(`users:`);
    console.dir(await prisma.users.findMany());
    console.log(`last access token: ${ newAccessToken }`)
    
    return { user: updatedUser, newAccessToken, newRefreshToken };
  }

  async isEmailUsed(email: string): Promise<any> {
    return await prisma.users.findUnique({
      where: { email },
    });
  }

  
}

export default new RegistrationService();

