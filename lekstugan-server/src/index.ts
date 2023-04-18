import express, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import { config } from 'dotenv';
import { router } from './routes/api/router';
import mongoose from 'mongoose';
config();

if (process.env.DB_CONNECTION_STRING !== undefined) {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
      const app = express();
      app.use(helmet());
      app.use(logger('dev'));

      const PORT = process.env.PORT || 3000;

      app.use('/', router);

      const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
        err.status = err.status || 500;
        if (req.app.get('env') !== 'development') {
          return res.status(err.status).json({
            status: err.status,
            message: err.message,
          });
        }

        return res.status(err.status).json({
          status: err.status,
          message: err.message,
          cause: err.cause
            ? {
                status: err.cause.status,
                message: err.cause.message,
                stack: err.cause.stack,
              }
            : null,
          stack: err.stack,
        });
      };

      app.use(errorHandler);

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  throw new Error('Missing db connection string, exiting');
}
