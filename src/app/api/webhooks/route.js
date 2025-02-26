import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.log("Webhook secret not found")
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }
  console.log("Webhook secret found")
  // Get the headers
  const headerPayload = headers();
  const svix_id =  headerPayload.get('svix-id');
  const svix_timestamp =  headerPayload.get('svix-timestamp');
  const svix_signature =  headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt?.data;
  const eventType = evt?.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses, username, external_accounts } = evt?.data;
    
    // Extract user details
    const googleAccount = external_accounts?.find(acc => acc.provider === "oauth_google");
    const userFirstName = first_name || googleAccount?.first_name || "";
    const userLastName = last_name || googleAccount?.last_name || "";
    const email = email_addresses?.[0]?.email_address || googleAccount?.email_address || "";
    const userImage = image_url || googleAccount?.image_url || "";
    const userUsername = username || email?.split('@')[0] || "";
  
    // Ensure email exists
    if (!email) {
      console.error("No email found in user data");
      return new Response('Error: No email found', { status: 400 });
    }
  
    try {
      const user = await createOrUpdateUser(id, userFirstName, userLastName, userImage, email, userUsername);
  
      if (user && eventType === 'user.created') {
        try {
          await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: {
              userMongoId: user._id,
              isAdmin: user.isAdmin,
            },
          });
        } catch (error) {
          console.log('Error updating user metadata:', error);
        }
        console.log('User created');
      }
    } catch (error) {
      console.log('Error creating or updating user:', error);
      return new Response('Error occurred', { status: 400 });
    }
  }
  

  if (eventType === 'user.deleted') {
    const { id } = evt?.data;
    try {
      await deleteUser(id);
    } catch (error) {
      console.log('Error deleting user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
    console.log("user deleted")
  }
  return new Response('', { status: 200 });
}
