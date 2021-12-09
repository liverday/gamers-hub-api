import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';

import CreatePostRequestDTO from '@modules/posts/dto/create-post-request.dto';
import CreatePostService from '@modules/posts/services/create-post.service';
import Post from '@modules/posts/model/post';

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
}