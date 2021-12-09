import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs'
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/model/user';
import AppError from '@errors/app-error';
import CreateSessionDTO from '@modules/users/dtos/create-session.dto';
import UsersRepository from '@modules/users/repositories/users-repository';

interface Response {
    user: User,
    token: string;
}

@injectable()
export default class CreateSessionService {
    constructor(
        @inject('UsersRepository') private usersRepository: UsersRepository
    ) {
    }

    async execute({ userNameOrEmail, password }: CreateSessionDTO): Promise<Response> {
        const userFoundByNameOrEmail = await this.usersRepository.findByUserNameOrEmail(userNameOrEmail);

        if (!userFoundByNameOrEmail) {
            throw new AppError(404, 'As credenciais enviadas estão incorretas')
        }

        const isSamePassword = await compare(password, userFoundByNameOrEmail.password);

        if (!isSamePassword) {
            throw new AppError(404, 'As credenciais enviadas estão incorretas')
        }

        const token = sign({}, process.env.JWT_SECRET as string, {
            subject: userFoundByNameOrEmail.id,
            expiresIn: process.env.JWT_EXPIRES_IN as string
        });

        return {
            token,
            user: userFoundByNameOrEmail
        }
    }
}