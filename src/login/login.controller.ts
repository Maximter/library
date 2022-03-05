import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async clearCookieAndRenderPage(@Res() res: Response) {
    res.clearCookie('token');
    return res.render('login');
  }

  @Post()
  async loginUser(@Body() body: Body, @Res() res: Response) {
    let answer = await this.loginService.loginUser(body);

    if ('error_message' in answer) {
      return res.render('login', { error_message: answer.error_message });
    } else {
      res.cookie('token', answer.token);
      return res.redirect('/');
    }
  }
}
