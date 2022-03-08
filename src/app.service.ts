import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';

import { BookClass } from './service/book.service';

import { User } from './entity/user.entity';
import { Book } from './entity/book.entity';
import { UserReading } from './entity/user.reading.entity';
import { Token } from './entity/token.entity';

@Injectable()
export class AppService {
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

  async checkValidToken(token) {
    let exist: boolean;

    const tokenEntity = await this.tokenRepository.findOne({
      where: { token: token },
    });

    tokenEntity ? (exist = true) : (exist = false);

    return exist;
  }

  async getDifferentTypesOfBooks() {
    const bookClass = new BookClass(this.bookRepository);
    const books = await bookClass.getDifferentTypesOfBooks();

    return books;
  }

  async getUserReadingBooks(token: number): Promise<object[]> {
    const tokenEntity = await getConnection()
    .getRepository(Token)
    .createQueryBuilder("token")
    .leftJoinAndSelect("token.user", "user")
    .where('token.token = :token', { token: token })
    .getOne();

    const user = tokenEntity.user   
    
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
}
