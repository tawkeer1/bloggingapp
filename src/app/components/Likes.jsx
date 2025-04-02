"use client";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useUser } from "@clerk/nextjs"; 
import { Alert } from "flowbite-react";

const Likes = ({ slug, initialLikes = [] }) => {
  const { user } = useUser();
  const userId = user?.id;

  const [likes, setLikes] = useState(initialLikes.length);
  const [alreadyLiked, setAlreadyLiked] = useState(initialLikes.includes(userId));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/likes?slug=${slug}`);
        const data = await response.json();
        setLikes(data.like_count);
        setAlreadyLiked(data.liked);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [slug, userId]);

  const handleLike = async () => {
    if (!userId) {
      setError("Please log in to like this post.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.like_count);
        setAlreadyLiked(data.liked);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <>
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
          <Alert color="failure" className="text-center">
            <span className="font-medium">{error}</span>
          </Alert>
        </div>
      )}

      <div>
        <span className="flex gap-2 items-center text-lg">
          <AiFillLike
            onClick={handleLike}
            className={`cursor-pointer ${alreadyLiked ? "text-blue-500" : "text-gray-500"}`}
          />
          <span>{likes}</span>
        </span>
      </div>
    </>
  );
};

export default Likes;
