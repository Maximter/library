import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookClass } from './service/book.service';

import { User } from './entity/user.entity';
import { Book } from './entity/book.entity';
import { UserReading } from './entity/user.reading.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,

    @InjectRepository(Book) 
    private bookRepository: Repository<Book>,

    @InjectRepository(UserReading) 
    private userReadingRepository: Repository<UserReading>
  ) {}

  async checkValidToken(token) {
    let exist : boolean

    const checkData = await this.userRepository.findOne(
      { where: { token : token }}
    );

    checkData ?
      exist = true : 
      exist = false

    return exist
  } 

  async getDifferentTypesOfBooks () {
    const bookClass = new BookClass(this.bookRepository);
    const books = await bookClass.getDifferentTypesOfBooks();

    return books;
  }

  async getUserReadingBooks (token : number) : Promise<object[]> {
    const user = await this.userRepository.findOne(
      { where: { token : token }}
    );   
    
    const idReadingBooks = await this.userReadingRepository.find(
      { where: { id_user : user.id_user }}
    );  

    let readingBooks : object[] = []

    for (let i = 0; i < idReadingBooks.length; i++) {
      const bookData = await this.bookRepository.findOne(
        { where: { id_book : idReadingBooks[i].id_book }}
      );
      readingBooks.push(bookData)
    }
    
    return readingBooks;
  }
}
 