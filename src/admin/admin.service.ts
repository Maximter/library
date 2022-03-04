import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Admin } from '../entity/admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin) 
        private adminRepository: Repository<Admin>,
      ) {}


    async checkIfAdmin (token : string) : Promise<boolean> {
        const findAdmin = await this.adminRepository.findOne(
            { where: { token : token }}
        );

        let admin : boolean;
            
            findAdmin ?
                admin = true :
                admin = false

        return admin;
    }
}
