import CreateFileDTO from "../dto/create-file.dto";
import File from "../model/file";

export default interface FilesRepository {
  findById(id: string): Promise<File | undefined>
  findAllByIds(ids: string[]): Promise<File[]>
  create(createFileDTO: CreateFileDTO): Promise<File>
}