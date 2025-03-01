import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', { status: 400 });
  }

  const { id } = evt?.data;
  const eventType = evt?.type;
  console.log(`Webhook with ID: ${id}, Type: ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username } = evt?.data;

    try {
      const firstName = first_name || "Unknown";
      const lastName = last_name || "User";
      const userName = username || `user_${id.substring(5, 10)}`;

      const email = email_addresses?.[0]?.email_address || "";

      if (!email) {
        console.error("No email found for user:", id);
        return new Response('Error: No email found', { status: 400 });
      }

      const user = await createOrUpdateUser(id, firstName, lastName, image_url, email, userName);

      if (user && eventType === 'user.created') {
        try {
          console.log("Updating user metadata for:", id);
          console.log("Metadata being set:", { userMongoId: user._id, isAdmin: user.isAdmin });

          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
              isAdmin: user.isAdmin,
            },
          });

          console.log("Metadata update successful for user:", id);
        } catch (error) {
          console.error('Error updating user metadata:', error);
          return new Response('Error updating user metadata', { status: 500 });
        }
      }
    } catch (error) {
      console.error('Error creating or updating user:', error);
      return new Response('Error occurred', { status: 400 });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt?.data;
    try {
      await deleteUser(id);
      console.log("User deleted:", id);
    } catch (error) {
      console.error('Error deleting user:', error);
      return new Response('Error occurred', { status: 400 });
    }
  }
  return new Response('', { status: 200 });
}
