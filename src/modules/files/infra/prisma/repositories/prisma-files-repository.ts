import prisma from '@infra/prisma/client';

import CreateFileDTO from "@modules/files/dto/create-file.dto";
import FilesRepository from "@modules/files/repositories/files-repository";
import File from "@modules/files/model/file";
import { FileMapper } from '@modules/files/mappers/file-mapper';

export default class PrismaFilesRepository implements FilesRepository {
  async findAllByIds(ids: string[]): Promise<File[]> {
    const foundFiles = await prisma.file.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })

    return foundFiles.map(FileMapper.toDomain)
  }

  async findById(id: string): Promise<File | undefined> {
    const foundFile = await prisma.file.findUnique({
        where: {
            id
        }
    })

    if (!foundFile) {
        return undefined
    }

    return FileMapper.toDomain(foundFile)
  }

  async create({ fileName, path }: CreateFileDTO): Promise<File> {
    const file = await prisma.file.create({
        data: {
            file_name: fileName,
            path
        }
    });

    return FileMapper.toDomain(file)
  }
}