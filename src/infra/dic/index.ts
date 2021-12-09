import './providers';

import { container } from 'tsyringe';

import UsersRepository from '@modules/users/repositories/users-repository';
import TypeOrmUsersRepository from '@modules/users/infra/typeorm/repositories/typeorm-users-repository';

import PostsRepository from '@modules/posts/repositories/posts-repository';
import TypeOrmPostsRepository from '@modules/posts/infra/typeorm/repositories/typeorm-posts-repository';

import FilesRepository from '@modules/files/repositories/files-repository';
import TypeOrmFilesRepository from '@modules/files/infra/typeorm/repositories/typeorm-files-repository';

container.registerSingleton<UsersRepository>('UsersRepository', TypeOrmUsersRepository)

container.registerSingleton<PostsRepository>('PostsRepository', TypeOrmPostsRepository)

container.registerSingleton<FilesRepository>('FilesRepository', TypeOrmFilesRepository)