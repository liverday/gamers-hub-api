import prisma from '@infra/prisma/client';
import CreateUserDTO from "@modules/users/dtos/create-user-dto";
import UserMapper from '@modules/users/mappers/user-mapper';
import User from "@modules/users/model/user";
import UsersRepository from "@modules/users/repositories/users-repository";

export default class PrismaUsersRepository implements UsersRepository {
    async create({
        username,
        email,
        password,
        first_name,
        last_name,
        gender
    }: CreateUserDTO): Promise<User> {
        const profile = await prisma.profile.create({
            data: {
                first_name,
                last_name,
                gender
            }
        })

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                profile: {
                    connect: profile
                }
            }
        });

        return UserMapper.toDomain(user)
    }

    async findByUserNameOrEmail(userNameOrEmail: string): Promise<User | undefined> {
        const foundUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: userNameOrEmail },
                    { username: userNameOrEmail }
                ]
            }
        })

        if (!foundUser)
            return undefined

        return UserMapper.toDomain(foundUser)
    }

    async findByUserName(userName: string): Promise<User | undefined> {
        const foundUser = await prisma.user.findFirst({
            where: {
                username: userName
            }
        })

        if (!foundUser)
            return undefined

        return UserMapper.toDomain(foundUser)
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const foundUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!foundUser)
            return undefined

        return UserMapper.toDomain(foundUser)
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users.map(user => UserMapper.toDomain(user))
    }

    async findById(id: string): Promise<User | undefined> {
        const foundUser = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!foundUser)
            return undefined

        return UserMapper.toDomain(foundUser)
    }
}