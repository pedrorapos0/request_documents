import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'uuid';

import RequestDocuments from '../models/RequestDocuments';
import Document from '../models/Document';
import RequestDocumentData from '../models/RequestDocumentData';
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

requestProcessRoutes.patch(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const { status } = request.body;
    const requestRepository = getRepository(RequestDocuments);
    if (!validate(id)) {
      return response.status(400).json({ mng: 'ID inválido!' });
    }
    const requestExist = await requestRepository.findOne({ id });
    if (!requestExist) {
      return response.status(404).json({ mng: 'Requisição não existe!' });
    }
    await requestRepository.update({ id }, { status });
    return response.json({ status });
  },
);

requestProcessRoutes.patch(
  '/:id/request_documents_data/:iddocument_data',
  async (request: Request, response: Response) => {
    const { id, iddocument_data } = request.params;
    const dataInfoUpdate = request.body;
    const requestRepository = getRepository(RequestDocuments);
    const requestDataDocumentRepositoty = getRepository(RequestDocumentData);
    if (!validate(id)) {
      return response.status(400).json({ mng: 'ID inválido!' });
    }
    const requestExist = await requestRepository.findOne({ id });
    if (!requestExist) {
      return response.status(404).json({ mng: 'Requisição não existe!' });
    }
    const { requestDocumentData } = requestExist;
    const requestData = requestDocumentData.find(
      documentData => documentData.id === iddocument_data,
    );
    if (!requestData) {
      return response
        .status(404)
        .json({ mng: 'Dados da requisição não existe!' });
    }
    const { id: idRequestData } = requestData;
    await requestDataDocumentRepositoty.update(
      { id: idRequestData },
      dataInfoUpdate,
    );
    return response.json({ dataInfoUpdate });
  },
);

requestProcessRoutes.patch(
  '/:id/document/:iddocument',
  async (request: Request, response: Response) => {
    const { id, iddocument } = request.params;
    const dataInfoUpdate = request.body;
    const requestRepository = getRepository(RequestDocuments);
    const documentRepository = getRepository(Document);
    if (!validate(id)) {
      return response.status(400).json({ mng: 'ID inválido!' });
    }
    const requestExist = await requestRepository.findOne({ id });
    if (!requestExist) {
      return response.status(404).json({ mng: 'Requisição não existe!' });
    }
    const { requestDocumentData } = requestExist;
    const requestData = requestDocumentData.find(
      document => document.document.id === iddocument,
    );
    if (!requestData) {
      return response.status(404).json({ mng: 'Documento não existe!' });
    }
    const { document } = requestData;
    await documentRepository.update({ id: document.id }, dataInfoUpdate);
    return response.json({ dataInfoUpdate });
  },
);

requestProcessRoutes.delete(
  '/:id',
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const requestRepository = getRepository(RequestDocuments);
    if (!validate(id)) {
      return response.status(400).json({ mng: 'ID inválido!' });
    }
    const requestExist = await requestRepository.findOne({ id });
    if (!requestExist) {
      return response.status(404).json({ mng: 'Requisição não existe!' });
    }
    await requestRepository.remove(requestExist);
    return response.send();
  },
);

export default requestProcessRoutes;
