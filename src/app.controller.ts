import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async checkAuthAndRenderPage(@Req() req, @Res() res : Response){
    let token = req.cookies['token']

    if (!token) return res.render('index', { guest : true });
    else {
      if (await this.appService.checkValidToken(token)) return res.render('index', { user : true });
      else {
        res.clearCookie('token');
        return res.render('index', { guest : true });
      }
    } 
  }
}