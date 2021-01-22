import { promises } from 'fs';
import { getRepository } from 'typeorm';
import { addDays } from 'date-fns';

import RequestDocumentData from '../models/RequestDocumentData';
import Document from '../models/Document';

interface RequestData {
  document: Document;
}

class RequestDocumentServices {
  public async execute({
    document,
  }: RequestData): Promise<RequestDocumentData> {
    const dateRequestDocument = new Date();
    const dateDevolutionDocument = addDays(new Date(), 2);
    const requestDocumentRepository = getRepository(RequestDocumentData);
    const requestDocument = requestDocumentRepository.create({
      document,
      dateDevolutionDocument,
      dateRequestDocument,
    });
    await requestDocumentRepository.save(requestDocument);
    return requestDocument;
  }
}

export default RequestDocumentServices;
