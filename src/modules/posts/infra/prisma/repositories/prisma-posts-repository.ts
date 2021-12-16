import prisma from '@infra/prisma/client';
import PagedResult from '@infra/utils/interfaces/paged-result';
import { FileMapper } from '@modules/files/mappers/file-mapper';

import CreatePostDTO from '@modules/posts/dto/create-post.dto';
import SearchPostsDTO from '@modules/posts/dto/search-posts.dto';
import PostMapper from '@modules/posts/mapper/post-mapper';
import Post from '@modules/posts/model/post';
import PostsRepository from '@modules/posts/repositories/posts-repository';

export default class PrismaPostsRepository implements PostsRepository {
    async create({ user, title, content, files }: CreatePostDTO): Promise<Post> {
        const prismaFiles = files.map(FileMapper.toExternal)
        
        const post = await prisma.post.create({
            data: {
                user: {
                    connect: user
                },
                title,
                content,
                post_files: {
                    connect: prismaFiles
                },
            }
        })

        return PostMapper.toDomain(post)
    }

    async findByUser(userId: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                user_id: userId
            }
        })

        return posts.map(PostMapper.toDomain)
    }

    async save({ id, user, title, content, createdAt, updatedAt }: Post): Promise<Post> {
        const post = await prisma.post.create({
            data: {
                id,
                user_id: user.id,
                title,
                content,
                created_at: createdAt,
                updated_at: updatedAt
            }
        });

        return PostMapper.toDomain(post)
    }
    
    async findById(id: string): Promise<Post | undefined> {
        const foundPost = await prisma.post.findUnique({
            where: {
                id
            }
        })

        if (!foundPost)
            return undefined

        return PostMapper.toDomain(foundPost)
    }

    async findAll(searchPostsDTO: SearchPostsDTO): Promise<PagedResult<Post>> {
        return {
            data: [],
            total: 0
        }
    }
}