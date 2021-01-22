import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import RequestDocuments from '../models/RequestDocuments';
import CreateRequestService from '../services/CreateRequestService';

const requestProcessRoutes = Router();

requestProcessRoutes.get('/', async (request: Request, response: Response) => {
  const requestRepository = getRepository(RequestDocuments);
  const requests = await requestRepository.find();
  return response.json(requests);
});

requestProcessRoutes.post('/', async (request: Request, response: Response) => {
  const { status, requestDocumentData, user } = request.body;
  const requestDocuments = await new CreateRequestService().execute({
    status,
    requestDocumentData,
    user,
  });
  return response.json(requestDocuments);
});

export default requestProcessRoutes;
