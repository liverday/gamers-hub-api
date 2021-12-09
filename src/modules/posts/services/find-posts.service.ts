import PagedResult from '@infra/utils/interfaces/paged-result';
import { injectable, inject } from 'tsyringe';
import SearchPostsDTO from "../dto/search-posts.dto";
import Post from '../model/post';
import PostsRepository from '../repositories/posts-repository';

@injectable()
export default class FindPostsService {
  constructor(
    @inject('PostsRepository') private postsRepository: PostsRepository
  ) { }

  async execute({ page, pageSize, title }: SearchPostsDTO): Promise<PagedResult<Post>> {
    return this.postsRepository.findAll({ page, pageSize, title })
  }
}
