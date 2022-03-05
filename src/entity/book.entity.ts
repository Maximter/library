import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  id_book: number;

  @Column()
  id_author: number;

  @Column()
  name_author: string;

  @Column({ length: 60 })
  name_book: string;

  @Column()
  genre: string;

  @Column({ default: 0 })
  read: number;

  @Column()
  status: string;
}
