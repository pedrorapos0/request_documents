import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import RequestDocumentData from './RequestDocumentData';
import User from './User';

@Entity('requests')
class RequestDocuments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => RequestDocumentData, request => request.requestDocument_id)
  @JoinColumn({ name: 'requestDocument_id' })
  request: RequestDocumentData[];

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  status: string;

  @Column('timestamp with time zone')
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RequestDocuments;
