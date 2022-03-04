import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book) 
        private bookRepository: Repository<Book>
    ) {}

    async getBooks () : Promise<object[]> {
        const books = await this.bookRepository.find(
            { where: { status: "Checked" }}
        );
        return books;
    }

    async addReadToBook (id_book) : Promise<void> {
        const book = await this.bookRepository.findOne(
            { where: { id_book: id_book }}
        );
        
        this.bookRepository.save({
            id: book.id,
            read: book.read + 1,
        });
    }
}
