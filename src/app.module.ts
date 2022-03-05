import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';

import { User } from './entity/user.entity';
import { Book } from './entity/book.entity';
import { BookModule } from './book/book.module';
import { AdminModule } from './admin/admin.module';
import { UserReading } from './entity/user.reading.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Book, UserReading]),
    SignupModule,
    LoginModule,
    ProfileModule,
    BookModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
