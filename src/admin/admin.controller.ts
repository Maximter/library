import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get()
    async renderPage(@Req() req, @Res() res : Response){
        const isAdmin = await this.adminService.checkIfAdmin(req.cookies['token'])

        if (isAdmin) return res.render('admin');
        else return res.redirect('/');
    }
}
