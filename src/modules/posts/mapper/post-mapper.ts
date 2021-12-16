import { Post as PrismaPost } from "@prisma/client";
import Post from "../model/post";

export default class PostMapper {
    static toDomain({ id, ...props }: PrismaPost): Post {
        return Post.create(id, props)
    }
}