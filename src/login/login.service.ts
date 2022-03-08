import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/entity/token.entity';
import { Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { UserClass } from '../service/user.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  userClass = new UserClass(this.userRepository, this.tokenRepository);

  async loginUser(userData) {
    userData.email = userData.email.trim();
    userData.password = userData.password.trim();

    let answer = await this.userClass.CheckLogInUserData(userData);
    let error_message = {
      error_message: 'Введена неправильная почта или пароль',
    };

    if (!answer) return error_message;
    else return answer;
  }
}
