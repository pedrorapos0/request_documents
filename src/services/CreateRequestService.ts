import { getRepository } from 'typeorm';

import RequestDocuments from '../models/RequestDocuments';
import User from '../models/User';
import RequestDocumentData from '../models/RequestDocumentData';
import CreateuserService from './CreateuserService';
import CreateRequestDocumetsServices from './CreateRequestDocumetsServices';

interface RequestData {
  status: string;
  user: User;
  requestDocumentData: RequestDocumentData[];
}

class CreateRequestService {
  public async execute({
    status,
    requestDocumentData,
    user,
  }: RequestData): Promise<RequestDocuments> {
    const createUserService = new CreateuserService();
    const { departament, email, name } = user;
    const HandleUser = await createUserService.execute({
      name,
      email,
      departament,
    });
    const createRequestDocumetsServices = new CreateRequestDocumetsServices();
    const results = [];
    for (const requestDocument of requestDocumentData) {
      const { document } = requestDocument;
      const newRequestDocument = createRequestDocumetsServices.execute({
        document,
      });
      results.push(newRequestDocument);
    }
    const handlerequestDocumentData = await Promise.all(results);
    const requestRepository = getRepository(RequestDocuments);
    const request = requestRepository.create({
      status,
      requestDocumentData: handlerequestDocumentData,
      user: HandleUser,
      received: false,
    });
    await requestRepository.save(request);
    return request;
  }
}

export default CreateRequestService;
