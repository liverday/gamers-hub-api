import path from 'path';
import fs from 'fs';
import multerConfig from '@config/multer';
import StorageProvider from "../storage-provider";

export default class DiskStorageProvider implements StorageProvider {
  async save(filePath: string): Promise<string> {
    const uploadFilePath = path.resolve(multerConfig.uploadFolder, filePath)
    const tmpFilePath = path.resolve(multerConfig.tmpFolder, filePath)
    await fs.promises.rename(
      tmpFilePath,
      uploadFilePath
    );

    return uploadFilePath;
  }
  async delete(filePath: string): Promise<void> {
    const resolvedFilePath = path.resolve(multerConfig.uploadFolder, filePath);

    try {
      await fs.promises.stat(resolvedFilePath);
    } catch {
      return;
    }

    await fs.promises.unlink(resolvedFilePath);
  }

}