import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Get()
  async clearCookieAndRenderPage(@Res() res: Response) {
    res.clearCookie('token');
    return res.render('signup');
  }

  @Post()
  async signupUser(@Body() body: Body, @Res() res: Response) {
    let answer = await this.signupService.SignupServiceUser(body);
    if (answer != 'ok') {
      return res.render('signup', { error_message: answer });
    } else {
      return res.redirect('/login');
    }
  }
}
