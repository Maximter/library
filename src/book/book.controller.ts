import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

  @Get()
  async renderPage(@Res() res : Response){
    const books = await this.bookService.getBooks();
    return res.render('book', { books : books });
  }

  @Get(':id')
  async openBook(@Param() params, @Res() res : Response){
    params.id = params.id.slice(1)
    await this.bookService.addReadToBook(params.id)
    return res.sendFile(`D:/projects/library-2/public/books/${params.id}.pdf`);
  }
}
 