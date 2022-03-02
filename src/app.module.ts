import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';

import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User]), 
            SignupModule, LoginModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
