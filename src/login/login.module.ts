import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { User } from '../entity/user.entity';
import { Admin } from '../entity/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
 