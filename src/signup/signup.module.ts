import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

import { User } from '../entity/user.entity';
import { Token } from 'src/entity/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
