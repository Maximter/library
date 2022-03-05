import { InjectRepository } from '@nestjs/typeorm';
import { PxfObject } from 'tls';
import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';

export class BookClass {
    constructor(
        @InjectRepository(Book) 
        private bookRepository: Repository<Book>
      ) {}

    async getDifferentTypesOfBooks () : Promise<object> {
        const theNewestBooks : object[] = [];
        const mostPopularBooks : object[] = [];
        const randomBooks : object[] = [];

        const books = await this.bookRepository.find({ where : {status : 'Checked'}});

        for (let i = books.length - 1; i > books.length - 5; i--) theNewestBooks.push(books[i])
        books.sort((prev, next) => prev.read - next.read);
        for (let i = books.length - 1; i > books.length - 5; i--) mostPopularBooks.push(books[i])   
        for (let i = 0; i < 4; i++) randomBooks.push(books[Math.floor(Math.random() * books.length)])   

        return { mostPopularBooks : mostPopularBooks, 
                 theNewestBooks : theNewestBooks,
                 randomBooks : randomBooks }
    }

    async searchMatches (where, search) : Promise<object[]> {
      const matches : object[] = [];

      const allbooks = await this.bookRepository.find({ where : {status : 'Checked'}})
      for (let i = 0; i < allbooks.length; i++) {
        if (allbooks[i][`${where}`].toLowerCase().trim().includes(search.toLowerCase().trim())) matches.push(allbooks[i]);
      }     

      return matches;
    }
}