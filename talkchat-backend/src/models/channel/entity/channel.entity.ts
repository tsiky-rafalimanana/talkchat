
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../../message/entity/message.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column({ type: 'varchar', length: 255 })
  name: string;
  
  @Column({ type: 'varchar', length: 255 })
  description: string;
  
  @Column({ type: 'varchar', length: 255 })
  owner: string;
  
  @Column({ type: 'boolean', default: false})
  archived: boolean;

  @Column({ type: 'boolean', default: false})
  private: boolean;
  
  @Column({ type: 'boolean', default: false})
  direct: boolean;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => Message, (message) => message.channel, {eager: true})
  messages: Message[];

  @ManyToMany(() => User, (user) => user.channels, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  members: User[];

}
