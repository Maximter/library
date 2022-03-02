import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entity/user.entity';
import { UserClass } from '../user/user.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  async loginUser(userData) {
    const userClass = await new UserClass(this.userRepository);

    userData.email = userData.email.trim();
    userData.password = userData.password.trim();

    let answer = await userClass.CheckLogInUserData(userData)
    let error_message = { error_message: "Введена неправильная почта или пароль"}

    if (answer == false) return error_message
    else return answer;
  } 
}
