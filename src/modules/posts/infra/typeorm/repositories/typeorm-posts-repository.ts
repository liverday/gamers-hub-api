import createPostDto from '@modules/posts/dto/create-post.dto';
import Post from '@modules/posts/model/post';
import PostsRepository from '@modules/posts/repositories/posts-repository';
import { Repository, getRepository } from 'typeorm';

export default class TypeOrmPostsRepository implements PostsRepository {
    private repository: Repository<Post>
    constructor() {
        this.repository = getRepository(Post)
    }

    create({ title, content, files }: createPostDto): Promise<Post> {
        const post = this.repository.create({
            title,
            content,
            filesIds: files
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
}