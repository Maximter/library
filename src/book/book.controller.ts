import { Controller, Get, Post, Req, Res, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async renderPage(@Res() res: Response) {
    const books = await this.bookService.getDifferentTypesOfBooks();
    return res.render('book', { books: books });
  }

  @Get('catalog')
  async renderCatalogPage(@Res() res: Response) {
    const books = await this.bookService.getAllBooks();
    return res.render('catalog', { books: books });
  }

  @Get(':id')
  async openBook(@Param() params, @Req() req, @Res() res: Response) {
    params.id = params.id.slice(1);
    if (req.cookies['token'] != 'qqqqqq') {
      await this.bookService.addReadToBook(params.id);
      await this.bookService.addBookToReadingToUser(
        params.id,
        req.cookies['token'],
      );
    }
    return res.sendFile(`D:/projects/library-2/public/books/${params.id}.pdf`);
  }

  @Post('search')
  async searchBook(@Body() body, @Res() res: Response) {
    const foundBooks = await this.bookService.findBook(
      body.whereFind,
      body.searchWord,
    );
    return res.render('search', { foundBooks: foundBooks });
  }

  @Post(':id')
  async deleteBook(@Param() params, @Req() req, @Res() res: Response) {
    params.id = params.id.slice(1);
    await this.bookService.deleteBook(params.id, req.cookies['token']);
    return res.redirect('/');
  }
}
