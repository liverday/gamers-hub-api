import { File as PrismaFile } from "@prisma/client";
import File from "../model/file";

export class FileMapper {
    static toDomain({ id, file_name, path }: PrismaFile): File {
        return File.create(id, {
            fileName: file_name,
            path
        })
    }

    static toExternal({ id, fileName, path, createdAt, updatedAt }: File): PrismaFile {
        return {
            id,
            file_name: fileName,
            path,
            created_at: createdAt,
            updated_at: updatedAt,
        }
    }
}