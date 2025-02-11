
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/Config.js';

class Verification {
  async verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    console.log(`verifyAccessToken`)
    const authHeaders = req.headers['authorization'];  // not Authorization ??
  
    if (authHeaders === undefined) {
      res.status(401).json({ message: 'Access token is missing' }); 
    } else if (typeof authHeaders === "object") {
      res.status(401).json({ message: 'Access token - too much' });
    } else {
      //Authorization: Bearer <access_token>
      const token = authHeaders.split(' ')[1];
  
      jwt.verify(token, config.jwtSecret, (err) => {
        if (err) {
          res.status(403).json({ message: "Invalid or expired access token" });
        } else {
          next();
        }   
      });
    }
  };
}

export default new Verification();

// const refreshTokens = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).json({ message: 'Refresh token is missing' });
//   }

//   // Проверка refresh токена
//   const userId = verifyRefreshToken(refreshToken);
//   if (!userId) {
//     return res.status(403).json({ message: 'Invalid or expired refresh token' });
//   }

//   // Проверка, что refresh токен совпадает с сохраненным в базе данных
//   const user = await User.findById(userId);
//   if (user.refreshToken !== refreshToken) {
//     return res.status(403).json({ message: 'Refresh token does not match' });
//   }

//   // Генерация нового access токена
//   const newAccessToken = generateAccessToken(userId);

//   // Генерация нового refresh токена (опционально)
//   const newRefreshToken = generateRefreshToken(userId);
//   await saveRefreshToken(userId, newRefreshToken);

//   // Отправка новых токенов клиенту
//   res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
// };

// const verifyRefreshToken = (refreshToken) => {
//   try {
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     return decoded.userId; // Возвращает ID пользователя
//   } catch (error) {
//     return null; // Токен невалиден или истек
//   }
// };
