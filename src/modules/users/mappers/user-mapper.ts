import User from "../model/user";
import { User as PrismaUser } from '.prisma/client';

export default class UserMapper {
    static toDomain({ id, ...rest }: PrismaUser): User {
        const createdUser = User.create(id, {
            ...rest
        });

        return createdUser
    }

    static toExternal(user: User): PrismaUser {
        return {
            id: user.id,
            profile_id: user.profile.id,
            email: user.email,
            username: user.username,
            password: user.password,
            is_active: user.isActive,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        }
    }
}