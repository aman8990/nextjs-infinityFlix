import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/app/_libs/prismadb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook Signature Verification Failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook error: ' + err.message },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const userEmail = session.customer_email;

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);

    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: {
        subscribedUpto: currentDate,
        paymentId: session.payment_intent,
      },
    });

    const amountInDollars = session.amount_total / 100;

    const payment = await prisma.payment.create({
      data: {
        userId: updatedUser.id,
        amount: amountInDollars,
        currency: session.currency,
        paymentId: session.payment_intent,
        paymentStatus: 'Paid',
      },
    });
    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ message: 'Event received' });
}
