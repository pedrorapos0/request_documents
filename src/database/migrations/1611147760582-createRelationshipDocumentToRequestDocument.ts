import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class createRelationshipDocumentToRequestDocument1611147760582
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('requests_document_data', [
      new TableColumn({
        name: 'document_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'requestDocument_id',
        type: 'uuid',
        isNullable: true,
      }),
    ]);
    await queryRunner.createForeignKeys('requests_document_data', [
      new TableForeignKey({
        name: 'documents',
        columnNames: ['document_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'documents',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'requestDocument',
        columnNames: ['requestDocument_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'requests',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('requests_document_data', 'documents');
    await queryRunner.dropForeignKey(
      'requests_document_data',
      'requestDocument',
    );
    await queryRunner.dropColumn('requests_document_data', 'document_id');
    await queryRunner.dropColumn(
      'requests_document_data',
      'requestDocument_id',
    );
  }
}
