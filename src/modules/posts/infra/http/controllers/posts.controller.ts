import CreatePostDTO from '@modules/posts/dto/create-post.dto';
import { Request, Response } from 'express';

export default class PostsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { title, content, files }: CreatePostDTO = request.body
        return response.json({ 
            title,
            content,
            files
        })
    }
}