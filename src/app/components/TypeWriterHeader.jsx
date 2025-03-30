import Link from "next/link";
import React from "react";

const TypeWriterHeader = () => {
  return (
    <>
      {/* inline-block pb-5 text-3xl font-bold lg:text-6xl max-[456px]:hidden */}
      <div className="text-gray-700 smalldevicemargin flex flex-col gap-6 text-center mx-6 lg:mx-auto my-4 p-10 px-6 max-w-6xl bg-gray-200  dark:bg-gray-800 dark:text-white shadow-xl rounded-lg ">
        <div className="max-w-6xl containertypewriter text-center p-4">
          <div className="text-center">
            {/* Default text */}
            <h1 className="pb-5 typed-out font-bold text-3xl lg:text-6xl max-w-full max-[385px]:hidden flex items-center gap-2">
  Welcome to my Blog 
  <span className="inline-flex items-center">
    <img
      src="/hello-hey.gif"
      alt="Attention Animation"
      className="w-6 h-8 lg:h-12 lg:w-14 ml-2"
    />
  </span>
</h1>


            {/* Shortened text for small screens */}
            <h1 className=" font-bold text-3xl lg:text-6xl max-w-full hidden max-[385px]:block">
              Welcome
            </h1>
          </div>
        </div>
        <p className="text-gray-500 text-sm sm:text-base">
          Discover a variety of articles and tutorials on topics such as web
          development, software engineering, and programming languages, all
          brought to you through a blog built with Next.js and{" "}
          <a
            href="https://go.clerk.com/fgJHKlt"
            className="text-teal-500 hover:underline"
            target="_blank"
          >
            Clerk
          </a>
          .
        </p>
        <Link
          href="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
    </>
  );
};

export default TypeWriterHeader;
