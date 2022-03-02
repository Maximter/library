import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
 