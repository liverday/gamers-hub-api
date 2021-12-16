import Post from '@modules/posts/model/post'
import User from '@modules/users/model/user';
export default class PostComment {
    id: string;
    post: Post;
    user: User;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
