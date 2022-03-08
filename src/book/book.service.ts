import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  getRepository,
  QueryBuilder,
  getConnection,
} from 'typeorm';

import { BookClass } from '../service/book.service';

import { User } from 'src/entity/user.entity';
import { Book } from '../entity/book.entity';
import { UserReading } from 'src/entity/user.reading.entity';
import { Token } from 'src/entity/token.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,

    @InjectRepository(UserReading)
    private userReadingRepository: Repository<UserReading>,
  ) {}

  bookClass = new BookClass(this.bookRepository);

  async getAllBooks(): Promise<object[]> {
    const books = await this.bookRepository.find({
      where: { status: 'Checked' },
    });
    return books;
  }

  async getDifferentTypesOfBooks() {
    const books = await this.bookClass.getDifferentTypesOfBooks();

    return books;
  }

  async addReadToBook(id_book): Promise<void> {
    const book = await this.bookRepository.findOne({
      where: { id_book: id_book },
    });

    this.bookRepository.save({
      id: book.id,
      read: book.read + 1,
    });
  }

  async addBookToReadingToUser(id_book, token): Promise<number> {
    if (!token) return 0;

    const tokenEntity = await getConnection()
      .getRepository(Token)
      .createQueryBuilder('token')
      .leftJoinAndSelect('token.user', 'user')
      .where('token.token = :token', { token: token })
      .getOne();

    const user = tokenEntity.user;

    const existReadingBook = await this.userReadingRepository.findOne({
      where: { user: user, id_book: id_book },
    });

    if (existReadingBook || !user) return 0;

    const newReadingBook = await this.userReadingRepository.create({
      user: user,
      id_book: id_book,
    });

    newReadingBook.save();
    return 0;
  }

  async deleteBook(id_book, token): Promise<number> {
    if (!token || !id_book) return 0;

    const tokenEntity = await getConnection()
      .getRepository(Token)
      .createQueryBuilder('token')
      .leftJoinAndSelect('token.user', 'user')
      .where('token.token = :token', { token: token })
      .getOne();

    const user = tokenEntity.user;

    const existReadingBook = await this.userReadingRepository.findOne({
      where: { user: user, id_book: id_book },
    });

    if (!existReadingBook) return 0;

    await this.userReadingRepository.delete(existReadingBook.id);
    return 0;
  }

  async findBook(whereFind, searchWord): Promise<object[]> {
    let foundBook: object[] = [];

    switch (whereFind) {
      case 'Author': {
        foundBook = await this.bookClass.searchMatches(
          'name_author',
          searchWord,
        );
        break;
      }
      case "Book's name": {
        foundBook = await this.bookClass.searchMatches('name_book', searchWord);
        break;
      }
      case "ID's book": {
        const book = await this.bookRepository.findOne({
          where: { id_book: searchWord, status: 'Checked' },
        });
        if (book) foundBook.push(book);
        break;
      }
      case 'Genre': {
        foundBook = await this.bookRepository.find({
          where: { genre: searchWord, status: 'Checked' },
        });
        break;
      }
    }

    return foundBook;
  }
}
