import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import Document from './Document';
import RequestDocuments from './RequestDocuments';

@Entity('requests_document_data')
class RequestDocumentData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Document, { eager: true })
  @JoinColumn({ name: 'document_id' })
  document: Document;

  @ManyToOne(
    () => RequestDocuments,
    requestDocument => requestDocument.requestDocumentData,
  )
  @JoinColumn({ name: 'requestDocument_id' })
  requestDocument: RequestDocuments;

  @Column('timestamp with time zone', { name: 'date_request_document' })
  dateRequestDocument: Date;

  @Column('timestamp with time zone', { name: 'date_devolution_document' })
  dateDevolutionDocument: Date | null;

  @Column('timestamp with time zone')
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RequestDocumentData;
