import PagedResult from "@infra/utils/interfaces/paged-result";
import CreatePostDTO from "../dto/create-post.dto";
import SearchPostsDTO from "../dto/search-posts.dto";
import Post from "../model/post";

export default interface PostsRepository {
    create(createPostDTO: CreatePostDTO): Promise<Post>
    findById(id: string): Promise<Post | undefined>
    findByUser(userId: string): Promise<Post[]>
    findAll(searchPostsDTO: SearchPostsDTO): Promise<PagedResult<Post>>
    save(post: Post): Promise<Post>
}