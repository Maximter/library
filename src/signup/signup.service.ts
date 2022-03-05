import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { User } from '../entity/user.entity';
import { UserClass } from '../service/user.service';
import { CheckValidData } from './signup.check.valid.data';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async SignupServiceUser(userData): Promise<string> {
    const userClass = await new UserClass(this.userRepository);

    userData.name = userData.name.trim();
    userData.email = userData.email.trim();
    userData.password = userData.password.trim();

    const MessageFromCheckValidData = await CheckValidData(userData);
    if (MessageFromCheckValidData != 'ok') return MessageFromCheckValidData;

    if (await userClass.CheckNameUserExist(userData)) {
      return 'Данное имя уже занято';
    } else if (await userClass.CheckEmailUserExist(userData)) {
      return 'Данная почта принадлежит другому пользователю';
    } else {
      const saltOrRounds = 7;
      const hashPassword = await bcrypt.hash(userData.password, saltOrRounds);

      const newUser = this.userRepository.create({
        name: userData.name,
        email: userData.email,
        password: hashPassword,
        token: await uuid.v4(),
      });

      await newUser.save();
      return 'ok';
    }
  }
}
