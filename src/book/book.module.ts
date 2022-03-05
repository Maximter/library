import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';

import { Book } from '../entity/book.entity';
import { UserReading } from 'src/entity/user.reading.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, UserReading])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
