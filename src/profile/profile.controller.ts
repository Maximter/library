import { Controller, UseInterceptors, Get, Post, Body, Render, Res, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async renderPage(@Req() req, @Res() res : Response){    
    const userData = await this.profileService.getUserData(req.cookies['token'])
    if (!userData.name) return res.redirect('/')
    const postedBooks = await this.profileService.getUserPostedBooks(userData.id_user)
    const readingBooks = await this.profileService.getUserReadingBooks(userData.id_user)
    
    return res.render('profile', { userName : userData.name, postedBooks: postedBooks, readingBooks : readingBooks }); 
  } 

  @Post()
  @UseInterceptors(FileInterceptor('book', { dest: 'public/books/rowBook' }))
  async postBook(@Req() req, @Res() res : Response, @Body() body){    
    body.bookName = body.bookName.trim();    

    if (body.bookName.length < 3 || body.bookName.length > 60) 
          return res.render('profile', { book_error_message : "Not valid book name" })

    const userData = await this.profileService.getUserData(req.cookies['token'])
    body.id_user = userData.id_user
    body.name_author = body.authorName
    body.id_book = await this.profileService.createIdBookAndRename(req.file.filename)

    await this.profileService.saveBookInDB(body)

    return res.redirect('profile');
  } 
}