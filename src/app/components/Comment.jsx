"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Alert, Button, Textarea } from "flowbite-react";

const Comments = ({ slug }) => {
  const { user } = useUser();
  const userId = user?.id;
  const username = user?.fullName || "Anonymous";

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?slug=${slug}`);
        const data = await res.json();
        setComments(data.comments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [slug]);

  // Handle submit
  const handleSubmit = async () => {
    if (!userId) {
      setError("Please log in to comment.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          comment: `${username}: ${newComment}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
        setNewComment("");
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {error && (
        <Alert color="failure" className="text-center">
          <span className="font-medium">{error}</span>
        </Alert>
      )}

      <div>
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
        />
        <Button
          className="mt-2"
          onClick={handleSubmit}
          isProcessing={submitting}
          disabled={submitting}
        >
          Post Comment
        </Button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Comments:</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li key={index} className="bg-gray-500 p-2 rounded text-sm">
                {comment}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Comments;
