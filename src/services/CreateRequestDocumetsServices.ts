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
<<<<<<< HEAD
    const dateDevolutionDocument = null;
=======
    const dateDevolutionDocument = null;
>>>>>>> 4108584405cfeee6ed39cb81dd5c493e85554a7a
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
