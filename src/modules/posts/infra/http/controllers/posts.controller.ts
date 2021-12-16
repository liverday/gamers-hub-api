import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { instanceToPlain, plainToClass } from 'class-transformer';

import CreatePostRequestDTO from '@modules/posts/dto/create-post-request.dto';
import CreatePostService from '@modules/posts/services/create-post.service';
import Post from '@modules/posts/model/post';
import FindPostsService from '@modules/posts/services/find-posts.service';

export default class PostsController {
    async create(request: Request, response: Response): Promise<Response> {
        const createPostService = container.resolve(CreatePostService)
        const { title, content, files }: CreatePostRequestDTO = request.body
        const { id: userId } = request.user

        const post = await createPostService.execute({
            userId,
            title, 
            content, 
            files
        })  
        
        return response.json(plainToClass(Post, post))
    }

    async index(request: Request, response: Response): Promise<Response> {
        const findPostsService = container.resolve(FindPostsService);
        const { page = 1, pageSize = 20, title } = request.query;
        
        const result = await findPostsService.execute({ 
            page: parseInt(page as string), 
            pageSize: parseInt(pageSize as string), 
            title: title as string  
        })

        return response.json(instanceToPlain(result))
    }
}