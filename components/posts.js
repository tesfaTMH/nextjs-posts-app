"use client";
import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import Image from "next/image";
import { togglePostLikesStatus } from "@/actions/postActions";
import { useOptimistic } from "react";

function Post({ post, action }) {
  return (
    <article className="flex gap-1 p-1 border-[1px] border-[#443f41] bg-[#131011] shadow-[0 0 6px rgpa(0,0,0,0.5)] m-3">
      <div className="">
        <Image
          src={post.image}
          alt={post.title}
          width={100}
          height={60}
          className="object-cover w-56 h-48 rounded-3xl"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <header className="flex items-start justify-between mb-1.5">
          <div className="flex flex-col items-start justify-start">
            <h2 className="m-0">{post.title}</h2>
            <p className="text-base text-[#b1a9ac]">
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)}>
              {console.log(post.isLiked)}
              <LikeButton className={post.isLiked ? "fill-[#e32195]" : ""} />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatePostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatePostId
      );

      if (!updatedPostIndex) {
        return prevPosts;
      }
      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;

      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePost = async (postId) => {
    updateOptimisticPosts(postId);
    await togglePostLikesStatus(postId);
  };

  return (
    <ul className="flex flex-col gap-1">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
