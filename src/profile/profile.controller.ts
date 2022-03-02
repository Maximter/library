import { Controller, Get, Post, Body, Render, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async renderPage(@Req() req, @Res() res : Response){    
    let userData = await this.profileService.getUserData(req.cookies['token'])
    if (!userData.name) return res.redirect('/')

    return res.render('profile', { userName : userData.name });
  }
}