import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Token } from './token.entity';
import { UserReading } from './user.reading.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ unique: true, length: 30 })
  name: string;

  @Column({ unique: true, length: 45 })
  email: string;

  @Column({ length: 65 })
  password: string;

  @OneToMany(() => UserReading, (reading) => reading.user)
  userReading: UserReading[];
}
