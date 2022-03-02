import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entity/user.entity';
import { UserClass } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}
 
  async getUserData (token) {
    const userClass = await new UserClass(this.userRepository);
    const user = await userClass.GetUserData(token);

    return user;
  }
}

