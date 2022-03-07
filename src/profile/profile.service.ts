import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

import { User } from '../entity/user.entity';
import { Book } from '../entity/book.entity';
import { UserReading } from 'src/entity/user.reading.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(UserReading)
    private userReadingRepository: Repository<UserReading>,
  ) {}

  async getUserData(token: string) {
    const user = await this.userRepository.findOne({ where: { token: token } });

    return user;
  }

  async getUserPostedBooks(user: User): Promise<object[]> {
    const postedBooks = await this.bookRepository.find({
      where: { id_author: user.id_user },
    });

    let needDataAboutBook: object[] = [];

    for (let i = 0; i < postedBooks.length; i++) {
      needDataAboutBook.push({
        id_book: postedBooks[i].id_book,
        book_name: postedBooks[i].name_book,
        genre: postedBooks[i].genre,
        read: postedBooks[i].read,
        status: postedBooks[i].status,
      });
    }

    return needDataAboutBook;
  }

  async getUserReadingBooks(user: User): Promise<object[]> {
    const idReadingBooks = await this.userReadingRepository.find({
      where: { user: user },
    });

    let readingBooks: object[] = [];

    for (let i = 0; i < idReadingBooks.length; i++) {
      const bookData = await this.bookRepository.findOne({
        where: { id_book: idReadingBooks[i].id_book },
      });
      readingBooks.push(bookData);
    }

    return readingBooks;
  }

  async createIdBookAndRename(multerBookName: string): Promise<number> {
    const id: number = Math.round(Math.random() * 100000000);

    await fs.rename(
      `public/books/rowBook/${multerBookName}`,
      `public/books/${id}.pdf`,
      function (err) {
        if (err) console.error('ERROR: ' + err);
      },
    );

    return id;
  }

  async saveBookInDB(bookData): Promise<void> {
    const newBook = this.bookRepository.create({
      id_book: bookData.id_book,
      id_author: bookData.id_user,
      name_book: bookData.bookName,
      name_author: bookData.name_author,
      genre: bookData.genre,
      status: 'Checking...',
    });

    await newBook.save();
  }
}
