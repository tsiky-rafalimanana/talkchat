
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;
  
  @Column({ type: 'varchar', length: 255 })
  nickname: string;
  
  @Column({ nullable: true, unique: true })
  @IsEmail({}, { message: 'Email incorrect' })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  photo_url: string;


  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

}
