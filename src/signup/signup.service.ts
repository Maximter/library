import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { User } from '../entity/user.entity';
import { UserClass } from '../user/user.service';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  async SignupServiceUser(userData) : Promise<string> {
    const userClass = await new UserClass(this.userRepository);

    userData.name = userData.name.trim();
    userData.email = userData.email.trim();
    userData.password = userData.password.trim();

    if (await userClass.CheckNameUserExist(userData)) {
      return "Данное имя уже занято"
    } else if (await userClass.CheckEmailUserExist(userData)) {
      return "Данная почта принадлежит другому пользователю"
    } else {
      const newUser = new User();
      const saltOrRounds = 7;
      const hashPassword = await bcrypt.hash(userData.password, saltOrRounds);

      newUser.name = userData.name;
      newUser.email = userData.email;
      newUser.password = hashPassword;
      newUser.token = await uuid.v4();

      await newUser.save();
      return ('ok')
    };


      
  }
}

