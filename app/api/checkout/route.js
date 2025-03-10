import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/paymentFailed`,
      customer_email: userEmail,
      line_items: [
        {
          price: 'price_1QxAePSG7m4hPidsdYOI3FlB',
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log('ERROR_IN_PAYMENT_SESSION', error);
    return NextResponse.json('Error in creating payment session', {
      status: 500,
    });
  }
}
