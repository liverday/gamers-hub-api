import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserDTO from '@modules/users/dtos/create-user-dto';
import CreateUserService from '@modules/users/services/create-user.service';
import { plainToClass } from 'class-transformer';
import User from '@modules/users/model/user';

export default class UserController {
    async create(request: Request, response: Response): Promise<Response> {
        const createUserService = container.resolve(CreateUserService)
        const {
            first_name,
            last_name,
            username,
            gender,
            email,
            password
        }: CreateUserDTO  = request.body

        const { user } = await createUserService.execute({
            first_name,
            last_name,
            username,
            gender,
            email,
            password
        });

        return response.json(plainToClass(User, user));
    }
}

