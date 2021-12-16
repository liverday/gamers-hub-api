import Post from '@modules/posts/model/post';
import { Exclude } from 'class-transformer';

export default class File {
    id: string;
    fileName: string;
    @Exclude()
    path: string;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];

    static create(id: string, props: Partial<File>): File {
        const newFile = new File();
        
        newFile.id = id

        Object.entries(props).forEach(([key, value]) => {
            (newFile as any)[key] = value
        })

        return newFile
    }
}