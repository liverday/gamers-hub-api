import User from '@modules/users/model/user';
import PostComment from './post-comment';
import File from '@modules/files/model/file'
export default class Post {
    id: string;
    user: User;
    comments: PostComment[];
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    filesIds: string[]
    files: File[];

    static create(id: string, props: Partial<Post>): Post {
        const newPost = new Post();
        
        newPost.id = id

        Object.entries(props).forEach(([key, value]) => {
            (newPost as any)[key] = value
        })

        return newPost
    }
}