import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppService } from '../app.service';

@Injectable()
export class CheckAuth implements NestMiddleware {
    constructor(private readonly appService: AppService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        let token = req.cookies['token']
        
        if (!token) return res.redirect('/login');
        else {
            if (await this.appService.checkValidToken(token)) next();
            else {
                res.clearCookie('token');
                return res.redirect('/login');
            }
        }
  }
} 