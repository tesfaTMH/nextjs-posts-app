import { createPost } from "@/actions/postActions";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return <PostForm createPost={createPost} />;
}
