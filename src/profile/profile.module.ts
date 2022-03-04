import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AppService } from '../app.service';
import { User } from '../entity/user.entity';
import { Book } from '../entity/book.entity';
import { CheckAuth } from '../middleware/check.auth'

@Module({
  imports: [TypeOrmModule.forFeature([User, Book])],
  controllers: [ProfileController],
  providers: [ProfileService, AppService],
})

export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuth)
      .forRoutes('profile');
  }
}
 