import CreatePostDTO from "../dto/create-post.dto";
import Post from "../model/post";

export default interface PostsRepository {
    create(createPostDTO: CreatePostDTO): Promise<Post>
    findById(id: string): Promise<Post | undefined>
    findByUser(userId: string): Promise<Post[]>
    save(post: Post): Promise<Post>
}