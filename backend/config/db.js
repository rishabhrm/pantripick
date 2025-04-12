const { Pool } = require('pg')
require('dotenv').config()

function ConnectionObj() {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })

  return pool
}

module.exports = { ConnectionObj }