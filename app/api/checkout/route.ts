import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const session = await stripe.checkout.sessions.create({
    line_items: body.line_items,
    mode: 'payment',
    success_url: body.success_url,
    cancel_url: body.cancel_url,
  })
  return NextResponse.json({ url: session.url })
}
