import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import * as fs from 'fs';

import { User } from '../entity/user.entity';
import { Book } from '../entity/book.entity';
import { UserReading } from 'src/entity/user.reading.entity';
import { Token } from 'src/entity/token.entity';

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
    const tokenEntity = await getConnection()
    .getRepository(Token)
    .createQueryBuilder("token")
    .leftJoinAndSelect("token.user", "user")
    .where('token.token = :token', { token: token })
    .getOne();

    const user = tokenEntity.user   

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

    if (idReadingBooks.length == 0) return [];

    let id: number[] = [];

    for (let i = 0; i < idReadingBooks.length; i++)
      id.push(idReadingBooks[i].id_book);

    const readingBooks = await getRepository(Book)
      .createQueryBuilder('book')
      .where('book.id_book IN (:...id)', { id: id })
      .getMany();

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
