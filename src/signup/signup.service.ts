import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupService {
  signupUser(): void {
    console.log('here')
  }
}
