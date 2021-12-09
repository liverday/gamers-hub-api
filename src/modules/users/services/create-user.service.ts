import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import User from "@modules/users/model/user";
import AppError from "@errors/app-error";
import CreateUserDTO from '@modules/users/dtos/create-user-dto';
import UsersRepository from '@modules/users/repositories/users-repository';

interface CreateUserResponse {
    user: User;
}

@injectable()
export default class CreateUserService {

    constructor(
        @inject('UsersRepository') private usersRepository: UsersRepository
    ) {
    }

    async execute({             
        first_name,
        last_name,
        username,
        gender,
        email,
        password
    }: CreateUserDTO): Promise<CreateUserResponse> {
        const userExistsByUserNameOrEmail = await this.usersRepository.findByUserNameOrEmail(email);

        if (userExistsByUserNameOrEmail) {
            throw new AppError(400, 'Usuário já existe!')
        }
        
        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            username,
            email,
            first_name,
            last_name,
            gender,
            password: hashedPassword
        })

        return {
            user
        }
    }
}