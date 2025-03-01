import User from '../../../../lib/models/user.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
  try {
    await connect();

    // Ensure user is authenticated
    const user = await currentUser();
    if (!user || !user.publicMetadata?.isAdmin) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Parse request body safely
    let data;
    try {
      data = await req.json();
    } catch (error) {
      return new Response('Invalid JSON', { status: 400 });
    }

    // Validate query params
    const startIndex = Number(data.startIndex) || 0;
    const limit = Number(data.limit) || 9;
    const sortDirection = data.sort === 'asc' ? 1 : -1;

    // Fetch users
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Get user counts
    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return new Response(JSON.stringify({ users, totalUsers, lastMonthUsers }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error getting the users:', error);
    return new Response('Error getting the users', { status: 500 });
  }
};
