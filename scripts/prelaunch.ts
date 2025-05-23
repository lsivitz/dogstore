import fs from 'fs'

const required = ['DATABASE_URL', 'STRIPE_SECRET_KEY']
let ok = true
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing env var ${key}`)
    ok = false
  }
}

if (!fs.existsSync('db/schema.sql')) {
  console.error('Missing db/schema.sql')
  ok = false
}

if (!ok) {
  process.exit(1)
} else {
  console.log('Prelaunch check passed')
}
