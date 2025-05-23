import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'pg'

function getClient() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL not set')
  return new Client({ connectionString: url })
}

export async function GET(req: NextRequest, { params }: { params: { cartId: string } }) {
  const client = getClient()
  await client.connect()
  const { rows } = await client.query('SELECT * FROM cart_items WHERE cart_id = $1', [params.cartId])
  await client.end()
  return NextResponse.json(rows)
}

export async function PUT(req: NextRequest, { params }: { params: { cartId: string } }) {
  const body = await req.json()
  const client = getClient()
  await client.connect()
  await client.query('DELETE FROM cart_items WHERE cart_id = $1', [params.cartId])
  for (const item of body.items ?? []) {
    await client.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity, color, size) VALUES ($1, $2, $3, $4, $5)',
      [params.cartId, item.productId, item.quantity, item.color, item.size]
    )
  }
  await client.end()
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: { params: { cartId: string } }) {
  const client = getClient()
  await client.connect()
  await client.query('DELETE FROM cart_items WHERE cart_id = $1', [params.cartId])
  await client.end()
  return NextResponse.json({ ok: true })
}
