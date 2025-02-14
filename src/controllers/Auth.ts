
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/Config.js';
import { PrismaClient } from '@prisma/client';
import { isRefreshTokenObject, isUserRefreshToken, T_RefreshTokensParams } from '../types/Auth.js';
import TokensService from "../services/Tokens.js"

const prisma = new PrismaClient();

class AuthController {
  async refreshTokens(req: Request, res: Response) {
    console.log(`POST /auth/refresh-token`);

    if (isUserRefreshToken(req.body)) {
      res.status(400).json({ message: 'Refresh token is required' });
    }
    const { oldRefreshToken } = req.body; 

    try {
      const payload = jwt.verify(oldRefreshToken, config.jwtRefreshSecret);
      if (!isRefreshTokenObject(payload)) {
        throw new Error(`Invalid refresh token payload: some fields are missing`);
      }

      const user = await prisma.users.findUnique({ 
        where: { id: payload.id } 
      });
      if (!user) {
        throw new Error(`Invalid refresh token payload: there's no such user id`);
      }

      const refreshTokensParams: T_RefreshTokensParams = { 
        userId: user.id,
        accessToken: payload,
        refreshToken: payload,
      };
      const { newAccessToken, newRefreshToken } = await TokensService.refreshTokens(refreshTokensParams)

      res.json({newAccessToken, newRefreshToken});
    } catch (err) {
      console.error(err);
      res.status(403).json({ message: 'Invalid refresh token' });
    }

  }
}

export default new AuthController();
