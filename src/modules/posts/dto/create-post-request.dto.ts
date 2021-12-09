export default interface CreatePostRequestDTO {
  title: string;
  content: string;
  files?: string[];
}