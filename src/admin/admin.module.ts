import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { Admin } from '../entity/admin.entity';
import { Book } from '../entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Book])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
