import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors'
import createConnection from './infra/typeorm';

import express, { NextFunction, Request, Response } from 'express';

import router from './infra/http/routers';
import AppError from './errors/app-error';

createConnection();
const app = express();
app.use(express.json());
app.use(router);

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
    console.log('A api foi iniciada');
});

export default app;