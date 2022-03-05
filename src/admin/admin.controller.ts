import { Controller, Get, Res, Req, Post, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async renderPage(@Req() req, @Res() res: Response) {
    const isAdmin = await this.adminService.checkIfAdmin(req.cookies['token']);

    if (isAdmin) {
      const books = await this.adminService.getAllCheckingBooks();
      return res.render('admin', { books: books });
    } else return res.redirect('/');
  }

  @Post(':id')
  async Check(@Param() params, @Res() res: Response, @Body() body) {
    params.id = params.id.slice(1);
    this.adminService.changeBookStatus(params.id, body.status);
    return res.redirect('/admin');
  }
}
