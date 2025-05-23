import { Client } from 'pg'
import * as fs from 'fs'
import * as path from 'path'

async function main() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('DATABASE_URL is not set')
    process.exit(1)
  }

  const client = new Client({ connectionString: dbUrl })
  await client.connect()

  const file = path.join(__dirname, '../db/schema.sql')
  const sql = fs.readFileSync(file, 'utf8')
  await client.query(sql)

  await client.query(`INSERT INTO products (name, description, image, price) VALUES
    ('Puppy Tee', 'Cute puppy print', '/placeholder.jpg', 2500),
    ('Doggo Hoodie', 'Warm and comfy', '/placeholder.jpg', 4500)
  `)

  await client.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
