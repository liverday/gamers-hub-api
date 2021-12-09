import PagedResult from '@infra/utils/interfaces/paged-result';
import CreatePostDTO from '@modules/posts/dto/create-post.dto';
import SearchPostsDTO from '@modules/posts/dto/search-posts.dto';
import Post from '@modules/posts/model/post';
import PostsRepository from '@modules/posts/repositories/posts-repository';
import { Repository, getRepository } from 'typeorm';

export default class TypeOrmPostsRepository implements PostsRepository {
    private repository: Repository<Post>
    constructor() {
        this.repository = getRepository(Post)
    }

    create({ user, title, content, files }: CreatePostDTO): Promise<Post> {
        const post = this.repository.create({
            title,
            content,
            files,
            user
        })

        return this.repository.save(post)
    }
    findByUser(userId: string): Promise<Post[]> {
        return this.repository.find({ 
            where: {
                user_id: userId 
            }
        })
    }
    save(post: Post): Promise<Post> {
        return this.repository.save(post)
    }
    
    findById(id: string): Promise<Post | undefined> {
        return this.repository.findOne(id)
    }

    async findAll({ page, pageSize, title }: SearchPostsDTO): Promise<PagedResult<Post>> {
        const params: any = {
            page,
            pageSize,
            where: {}
        };

        if (title) {
            params.where.title = title
        }
        
        const [data, total] = await this.repository.findAndCount(params)

        return {
            total,
            data
        }
    }
}