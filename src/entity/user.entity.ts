import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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

  @Column({ unique: true, length: 40 })
  token: string;
}
