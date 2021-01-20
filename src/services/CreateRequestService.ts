import { getRepository } from 'typeorm';

import RequestDocuments from '../models/RequestDocuments';

interface RequestData {
  status: string;
}

class CreateRequestService {
  public async execute({ status }: RequestData): Promise<RequestDocuments> {
    const requestRepository = getRepository(RequestDocuments);
    const request = requestRepository.create({
      status,
    });
    await requestRepository.save(request);
    return request;
  }
}

export default CreateRequestService;
