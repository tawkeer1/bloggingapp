import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { getAuth } from "@clerk/nextjs/server";

// POST: Add a new comment to a post
export const POST = async (req) => {
  try {
    await connect();
    const { userId } = getAuth(req);

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { slug, comment } = await req.json();

    if (!slug || !comment) {
      return new Response("Missing slug or comment", { status: 400 });
    }

    const post = await Post.findOne({ slug });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    post.comment.push(comment);
    await post.save();

    return new Response(
      JSON.stringify({ success: true, comments: post.comment }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding comment:", err);
    return new Response("Error adding comment", { status: 500 });
  }
};

// GET: Retrieve all comments for a post
export const GET = async (req) => {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Missing slug parameter", { status: 400 });
    }

    const post = await Post.findOne({ slug });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(
      JSON.stringify({ success: true, comments: post.comment }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching comments:", err);
    return new Response("Error fetching comments", { status: 500 });
  }
};
