import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admin } from '../entity/admin.entity';
import { Book } from '../entity/book.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async checkIfAdmin(token: string): Promise<boolean> {
    const findAdmin = await this.adminRepository.findOne({
      where: { token: token },
    });

    let admin: boolean;

    findAdmin ? (admin = true) : (admin = false);

    return admin;
  }

  async getAllCheckingBooks(): Promise<object[]> {
    const checkingBooks = await this.bookRepository.find({
      where: { status: 'Checking...' },
    });

    return checkingBooks;
  }

  async changeBookStatus(id_book, status): Promise<void> {
    const book = await this.bookRepository.findOne({
      where: { id_book: id_book },
    });

    await this.bookRepository.save({
      id: book.id,
      id_book: id_book,
      status: status,
      read: 0,
    });
  }
}
