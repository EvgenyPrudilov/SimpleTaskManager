
import jwt from 'jsonwebtoken';
import { T_AccessTokenPayload, T_RefreshTokenPayload, T_RefreshTokensParams } from '../types/Auth.js';
import { config } from '../config/Config.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TokensService {
  getAccessToken(payload: T_AccessTokenPayload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
  }

  getRefreshToken(payload: T_RefreshTokenPayload) {
    return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: "30d" });
  }

  getNewTokens(accessPayload: T_AccessTokenPayload, refreshPayload: T_RefreshTokenPayload) {
    return {
      newAccessToken: this.getAccessToken(accessPayload),
      newRefreshToken: this.getRefreshToken(refreshPayload)
    }
  }

  async refreshTokens(params: T_RefreshTokensParams) {
    const { newAccessToken, newRefreshToken } = this.getNewTokens(params.accessToken, params.refreshToken);

    const updatedUser  = await prisma.users.update({
      where: { id: params.userId }, 
      data: { token: newRefreshToken }, 
    });

    return { newAccessToken, newRefreshToken }
  }
}

export default new TokensService();
