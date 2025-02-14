
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
