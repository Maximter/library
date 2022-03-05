import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserReading extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;
 
  @Column()
  id_book: number;
}
  