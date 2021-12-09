import AppError from '@errors/app-error';
import File from '@modules/files/model/file';
import FilesRepository from '@modules/files/repositories/files-repository';
import UsersRepository from '@modules/users/repositories/users-repository';
import { inject, injectable } from 'tsyringe';
import CreatePostRequestDTO from '../dto/create-post-request.dto';
import Post from '../model/post';
import PostsRepository from '../repositories/posts-repository';

interface Request extends CreatePostRequestDTO {
  userId: string;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostsRepository') private postsRepository: PostsRepository,

    @inject('UsersRepository') private usersRepository: UsersRepository,

    @inject('FilesRepository') private filesRepository: FilesRepository
  ) { }

  async execute({ userId, title, content, files }: Request): Promise<Post> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError(401, 'Usuário inválido');
    }

    let entityFiles: File[] = []
    if (files) {
      entityFiles = await this.filesRepository.findAllByIds(files)
    }

    return this.postsRepository.create({
      title,
      content,
      files: entityFiles,
      user
    });
  }
}