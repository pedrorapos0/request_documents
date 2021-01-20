import { Router } from 'express';
import RequestProcesses from './RequestDocuments.routes';

const routes = Router();

routes.use('/request', RequestProcesses);

export default routes;
