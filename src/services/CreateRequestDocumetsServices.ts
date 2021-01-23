import { getRepository } from 'typeorm';
import { addDays } from 'date-fns';

import RequestDocumentData from '../models/RequestDocumentData';
import Document from '../models/Document';
import CreateDocumentService from './CreateDocumentService';

interface RequestData {
  document: Omit<Document, 'created_at' | 'updated_at' | 'id'>;
}

class RequestDocumentServices {
  public async execute({
    document,
  }: RequestData): Promise<RequestDocumentData> {
    const dateRequestDocument = new Date();
    const dateDevolutionDocument = undefined;
    const requestDocumentRepository = getRepository(RequestDocumentData);
    const { detail, protocol, documentType } = document;
    const newDocument = await new CreateDocumentService().execute({
      detail,
      documentType,
      protocol,
    });
    const requestDocument = requestDocumentRepository.create({
      document: newDocument,
      dateDevolutionDocument,
      dateRequestDocument,
    });
    await requestDocumentRepository.save(requestDocument);
    return requestDocument;
  }
}

export default RequestDocumentServices;
