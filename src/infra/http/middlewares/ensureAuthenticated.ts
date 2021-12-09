import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@errors/app-error';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default (request: Request, _: Response, next: NextFunction) => {
    const { authorization } = request.headers;

    if (!authorization) throw new AppError(401, 'Usuário não autenticado');

    try {
        const [, token] = authorization.split('Bearer ')

        const { sub } = verify(token, process.env.JWT_SECRET as string) as TokenPayload

        request.user = {
            id: sub
        }
    } catch (error) {
        throw new AppError(401, 'Usuário não autenticado')
    }

    next();
}