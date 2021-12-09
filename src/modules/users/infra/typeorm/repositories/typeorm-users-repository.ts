import { getRepository, Repository } from "typeorm";
import CreateUserDTO from "@modules/users/dtos/create-user-dto";
import User from "@modules/users/model/user";
import UsersRepository from "@modules/users/repositories/users-repository";

export default class TypeOrmUsersRepository implements UsersRepository {
    private repository: Repository<User>
    constructor() {
        this.repository = getRepository(User)
    }
    async create({ 
        username, 
        email, 
        password, 
        first_name, 
        last_name, 
        gender 
    }: CreateUserDTO): Promise<User> {
        
        const user = this.repository.create({
            username,
            email,
            password,
            profile: {
                firstName: first_name,
                lastName: last_name,
                gender
            }
        });

        return this.repository.save(user);
    }

    findByUserNameOrEmail(userNameOrEmail: string): Promise<User | undefined> {
        return this.repository.findOne({ 
            where: [
                { email: userNameOrEmail },
                { username: userNameOrEmail }
            ]
        })
    }
    
    findByUserName(userName: string): Promise<User | undefined> {
        return this.repository.findOne({ username: userName })
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.repository.findOne({ email })
    }

    findAll(): Promise<User[]> {
        return this.repository.find();
    }

}