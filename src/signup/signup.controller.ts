import { Controller, Get, Post, Render } from '@nestjs/common';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
constructor(private readonly signupService : SignupService) {}
  @Get()
  @Render('signup')
  root () {}

  @Post()
  signupUser () : void {
      this.signupService.signupUser();
  }
}

