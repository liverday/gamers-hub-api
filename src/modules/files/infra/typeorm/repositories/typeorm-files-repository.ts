import { Repository, getRepository } from "typeorm";

import CreateFileDTO from "@modules/files/dto/create-file.dto";
import FilesRepository from "@modules/files/repositories/files-repository";
import File from "@modules/files/model/file";

export default class TypeOrmFilesRepository implements FilesRepository {
  private repository: Repository<File>;
  constructor() {
    this.repository = getRepository(File);
    
  }
  findAllByIds(ids: string[]): Promise<File[]> {
    return this.repository.findByIds(ids)
  }

  findById(id: string): Promise<File | undefined> {
    return this.repository.findOne(id)
  }
  create({ fileName, path }: CreateFileDTO): Promise<File> {
    const file = this.repository.create({
      fileName,
      path
    })

    return this.repository.save(file)
  }
}