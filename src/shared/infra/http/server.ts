import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';
import '@shared/container';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started on port 3333');
});
