import AppError from "@errors/app-error";
import StorageProvider from "@infra/providers/storage-provider/storage-provider";
import UsersRepository from "@modules/users/repositories/users-repository";
import { injectable, inject } from "tsyringe";
import File from "../model/file";
import FilesRepository from "../repositories/files-repository";

interface Request {
  userId: string;
  fileNames: string[]
}

@injectable()
export default class CreateFileService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('FilesRepository') private filesRepository: FilesRepository,
    @inject('StorageProvider') private storageProvider: StorageProvider
  ) { }

  async execute({ userId, fileNames }: Request): Promise<File[]> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError(401, 'Usuário não autenticado')
    }

    return Promise.all(fileNames.map(fileName => {
      return new Promise<File>(async (resolve, reject) => {
        try {
          const path = await this.storageProvider.save(fileName)

          resolve(this.filesRepository.create({
            fileName,
            path
          }));
          
        } catch (err) {
          reject()
        }
      });
    }));
  }
}