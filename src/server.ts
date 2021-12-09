import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors'
import cors from 'cors';
import '@infra/typeorm';
import '@infra/dic';

import express, { NextFunction, Request, Response } from 'express';

import router from './infra/http/routers';
import AppError from './errors/app-error';
import multerConfig from '@config/multer';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(router);
app.use('/files', express.static(multerConfig.uploadFolder));

app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
    console.log(error);
    if (error instanceof AppError) {
        return response.status(error.status).json({
            status: error.status,
            message: error.message
        })
    }

    return response.json({
        status: 500,
        message: 'Internal Server Error'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`A api foi iniciada na porta: ${process.env.PORT}`);
});

export default app;