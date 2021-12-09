import CreateUserDTO from "../dtos/create-user-dto";
import Gender from "../model/gender";
import User from "../model/user";

export default interface UsersRepository {
    create(createUserDTO: CreateUserDTO): Promise<User>
    findById(id: string): Promise<User | undefined>
    findByUserNameOrEmail(userNameOrEmail: string): Promise<User | undefined>
    findByUserName(userName: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    findAll(): Promise<User[]>
}