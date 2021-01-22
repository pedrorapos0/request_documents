import { getRepository } from 'typeorm';
import Document from '../models/Document';

interface RequestData {
  protocol?: string;
  detail: string;
  documentType: string;
}

class CreateDocumentService {
  public async execute({
    detail,
    documentType,
    protocol,
  }: RequestData): Promise<Document> {
    const documentRepository = getRepository(Document);
    const documment = documentRepository.create({
      detail,
      documentType,
      protocol,
    });
    await documentRepository.save(documment);
    return documment;
  }
}

export default CreateDocumentService;
