import { request } from 'express';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import RequestDocumentData from './RequestDocumentData';
import User from './User';

@Entity('requests')
class RequestDocuments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  request: RequestDocumentData[];

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
