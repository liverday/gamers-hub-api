import File from "@modules/files/model/file";
import User from "@modules/users/model/user";

export default interface CreatePostDTO {
    user: User;
    title: string;
    content: string;
    files?: File[];
}