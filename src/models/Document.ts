import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  protocol: string;

  @Column()
  detail: string;

  @Column()
  documentType: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Document;
