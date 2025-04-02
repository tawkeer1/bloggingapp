import Post from "@/lib/models/post.model";
import { connect } from "@/lib/mongodb/mongoose";
import { auth } from "@clerk/nextjs";

export const POST = async (req) => {
  try {
    await connect();

    // Get user ID from Clerk
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { slug } = await req.json();

    // Find post by slug
    const post = await Post.findOne({ slug });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // Check if user already liked the post
    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      // Unlike (remove userId)
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      // Like (add userId)
      post.likes.push(userId);
    }

    await post.save();

    return new Response(JSON.stringify({ 
      success: true, 
      liked: !hasLiked, 
      like_count: post.likes.length 
    }), { status: 200 });

  } catch (err) {
    console.error("Error updating likes:", err);
    return new Response("Error updating likes", { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response("Missing slug parameter", { status: 400 });
    }

    // Fetch post by slug
    const post = await Post.findOne({ slug });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      like_count: post.likes.length, 
      liked: post.likes.includes(auth().userId) 
    }), { status: 200 });

  } catch (err) {
    console.error("Error fetching likes:", err);
    return new Response("Error fetching likes", { status: 500 });
  }
};
