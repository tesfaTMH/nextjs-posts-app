import { formatDate } from "@/lib/format";
import LikeButton from "./like-icon";
import Image from "next/image";

function Post({ post }) {
  return (
    <article className="flex gap-1 p-1 border-[1px] border-[#443f41] bg-[#131011] shadow-[0 0 6px rgpa(0,0,0,0.5)]">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
        <Image
          src={post.image}
          alt={post.title}
          width={8}
          height={6}
          className="object-cover"
        />
      </div>
      <div className="flex flex-1">
        <header className="flex items-start justify-between mb-1.5">
          <div>
            <h2 className="m-0">{post.title}</h2>
            <p className="text-base text-[#b1a9ac]">
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <LikeButton />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="flex flex-col gap-1">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}
