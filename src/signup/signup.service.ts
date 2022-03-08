import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { User } from '../entity/user.entity';
import { UserClass } from '../service/user.service';
import { CheckValidData } from './signup.check.valid.data';
import { Token } from 'src/entity/token.entity';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  userClass = new UserClass(this.userRepository, this.tokenRepository);

  async SignupServiceUser(userData): Promise<string> {
    userData.name = userData.name.trim();
    userData.email = userData.email.trim();
    userData.password = userData.password.trim();

    const MessageFromCheckValidData = await CheckValidData(userData);
    if (MessageFromCheckValidData != 'ok') return MessageFromCheckValidData;

    if (await this.userClass.CheckNameUserExist(userData)) {
      return 'Данное имя уже занято';
    } else if (await this.userClass.CheckEmailUserExist(userData)) {
      return 'Данная почта принадлежит другому пользователю';
    } else {
      const saltOrRounds = 7;
      const hashPassword = await bcrypt.hash(userData.password, saltOrRounds);

      const newUser = this.userRepository.create({
        name: userData.name,
        email: userData.email,
        password: hashPassword,
      });

      await newUser.save();

      const token = this.tokenRepository.create({
        user: newUser,
        token: await uuid.v4(),
      });

      await token.save();

      return 'ok';
    }
  }
}
