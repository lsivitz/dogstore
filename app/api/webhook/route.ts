import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Client } from 'pg'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })

function getClient() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL not set')
  return new Client({ connectionString: url })
}

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature') as string
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return new NextResponse('Webhook Error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const client = getClient()
    await client.connect()
    await client.query('INSERT INTO orders (cart_id, stripe_session_id, status) VALUES ($1, $2, $3)', [session.client_reference_id, session.id, 'paid'])
    await client.end()
  }

  return NextResponse.json({ received: true })
}
