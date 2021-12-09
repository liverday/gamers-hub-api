import FileModel from '@modules/files/model/file';
import CreateFileService from '@modules/files/services/create-file.service';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FilesController {
  async create(request: Request, response: Response): Promise<Response> {
    const files: Express.Multer.File[] = (request.files as Express.Multer.File[] | undefined) || []

    const { id: userId } = request.user;

    const createFileService = container.resolve(CreateFileService);

    const savedFiles = await createFileService.execute({
      userId,
      fileNames: files.map(file => file.filename)
    });

    return response.json(savedFiles.map(savedFile => plainToClass(FileModel, savedFile)))
  }
}