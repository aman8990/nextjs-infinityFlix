import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id');

  if (!session_id) {
    return new Response(JSON.stringify({ error: 'Session ID is required' }), {
      status: 400,
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
