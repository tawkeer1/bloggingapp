import CallToAction from "@/app/components/CallToAction";
import Comments from "@/app/components/Comment";
import Likes from "@/app/components/Likes";
import RecentPosts from "@/app/components/RecentPosts";
import { useUser } from "@clerk/nextjs";
import { Button } from "flowbite-react";
import Link from "next/link";
import { AiFillLike } from "react-icons/ai";

export default async function PostPage({ params }) {
  
  let post = null;
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ slug: params.slug }),
      cache: "no-store",
    });
    const data = await result.json();
    post = data.posts[0];
  } catch (error) {
    post = { title: "Failed to load post" };
  }
  if (!post || !post.title === "Failed to load post") {
    return (
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          Post not found
        </h2>
      </main>
    );
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        href={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-evenly items-center gap-10 p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>

      <Link
        href="/dashboard/create-post"
        className="text-center flex justify-center items-center font-semibold "
      >
        <p className="border border-gray-500 p-1 rounded-md mb-2 text-gray-800 dark:text-white">
          Create a post
        </p>
      </Link>

        <Likes slug={params.slug} initialLikes={post.likes}/>
        <Comments slug={post.slug} />
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <RecentPosts limit={3} />
    </main>
  );
}
