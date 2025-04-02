"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useUser } from "@clerk/nextjs"; // Get Clerk user info

const Likes = ({ slug, initialLikes = [] }) => {
  const { user } = useUser(); 
  const userId = user?.id;

  const [likes, setLikes] = useState(initialLikes.length);
  const [alreadyLiked, setAlreadyLiked] = useState(initialLikes.includes(userId));

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
      alert("Please log in to like the post.");
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
    <div>
      <span className="flex gap-2 items-center text-lg">
        <AiFillLike
          onClick={handleLike}
          className={`cursor-pointer ${alreadyLiked ? "text-blue-500" : "text-gray-500"}`}
        />
        <span>{likes}</span>
      </span>
    </div>
  );
};

export default Likes;
