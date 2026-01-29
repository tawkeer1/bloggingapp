import Link from "next/link";
import CallToAction from "./components/CallToAction";
import RecentPosts from "./components/RecentPosts";
import TypeWriterHeader from "./components/TypeWriterHeader";
import dynamic from "next/dynamic";
import QuoteWrapper from "./components/QuoteWrapper";
import Snowfall from "react-snowfall";
import SnowFall from "./SnowFall";

export default async function Home() {
  let posts = null;
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: 9, order: "desc" }),
      cache: "no-store",
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }
  return (
    <div className="relative min-h-screen">
      
      <TypeWriterHeader />
      <div className="max-w-[200px] max-h-30 sticky right-0 top-60 z-40">
        <QuoteWrapper />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="p-3">
          <CallToAction />
        </div>
        <div className="p-3 flex flex-col gap-8 py-7">
          <RecentPosts limit={9} />
          <Link
            href={"/search?category=null"}
            className="text-lg text-gray-500 hover:underline text-center dark:text-gray-200"
          >
            View all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
