import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Document from './Document';
import RequestDocuments from './RequestDocuments';

@Entity('requests_document_data')
class RequestDocumentData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  document: Document;

  requestDocument: RequestDocuments;

  @Column('timestamp with time zone')
  dateRequestDocument: Date;

  @Column('timestamp with time zone')
  dateDevolutionDocument: Date;

  @Column('timestamp with time zone')
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RequestDocumentData;
