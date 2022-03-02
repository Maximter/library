import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

  async checkValidToken(token) {
    let exist : boolean

    const checkData = await this.userRepository.findOne(
      { where: { token : token }}
    );

    checkData ?
      exist = true : 
      exist = false

    return exist
  } 
}
 