import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AppService } from '../app.service';
import { User } from '../entity/user.entity';
import { Book } from '../entity/book.entity';
import { CheckAuth } from '../middleware/check.auth';
import { UserReading } from 'src/entity/user.reading.entity';
import { Token } from 'src/entity/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token , Book, UserReading])],
  controllers: [ProfileController],
  providers: [ProfileService, AppService],
})
export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAuth).forRoutes('profile');
  }
}
