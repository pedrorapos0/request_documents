import express from 'express';

import './database';
import 'reflect-metadata';
import Routes from './routes';

const app = express();
app.use(express.json());
app.use('/', Routes);

export default app;
