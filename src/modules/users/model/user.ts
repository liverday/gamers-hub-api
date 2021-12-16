import { Exclude } from 'class-transformer';
import Profile from './profile';
import Post from '@modules/posts/model/post';
export default class User {
    id: string;
    username: string;
    email: string;
    @Exclude()
    password: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    profile: Profile;
    posts: Post[]

    static create(id: string, props: Partial<User>): User {
        const newUser = new User();

        newUser.id = id
        
        Object.entries(props).forEach(([key, value]) => {
            (newUser as any)[key] = value
        });

        return newUser
    }
}