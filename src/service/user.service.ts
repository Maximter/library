import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Token } from 'src/entity/token.entity';

export class UserClass {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async CheckNameUserExist(userData) {
    let name: string = userData.name;
    let exist: boolean;

    const checkName = await this.userRepository.findOne({
      where: { name: name },
    });

    checkName ? (exist = true) : (exist = false);

    return exist;
  }

  async CheckEmailUserExist(userData) {
    let email: string = userData.email;
    let exist: boolean;

    const checkEmail = await this.userRepository.findOne({
      where: { email: email },
    });

    checkEmail ? (exist = true) : (exist = false);

    return exist;
  }

  async CheckLogInUserData(userData) {
    let exist: boolean;

    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    user ? (exist = true) : (exist = false);

    if (exist && !(await bcrypt.compare(userData.password, user.password)))
      exist = false;

    const token = await this.tokenRepository.findOne({
      where: { user: user },
    });   

    if (exist) return { token: token.token };
    else return false;
  }

  async GetUserData(token) {
    const user = await this.userRepository.findOne({ where: { token: token } });

    return user;
  }
}
