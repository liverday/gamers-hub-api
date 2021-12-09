import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateSessionDTO from "@modules/users/dtos/create-session.dto";
import CreateSessionService from "@modules/users/services/create-session.service";
import { plainToClass } from "class-transformer";
import User from "@modules/users/model/user";

export default class SessionsController {
    async create(request: Request, response: Response): Promise<Response> {
        const createSessionService = container.resolve(CreateSessionService)

        const { 
            userNameOrEmail, 
            password 
        }: CreateSessionDTO = request.body

        const { token, user } = await createSessionService.execute({ userNameOrEmail, password })

        return response.json({
            token, 
            user: plainToClass(User, user)
        })
    }
}