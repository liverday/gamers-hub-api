import Gender from './gender';
import User from './user';

export default class Profile {
    id: string;
    user: User
    firstName: string;
    lastName: string;
    gender: Gender
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}