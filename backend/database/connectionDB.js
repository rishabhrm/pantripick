const Pool = require('pg').Pool
function ConnectionObj() {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pantripick',
    password: '1234',
    port: 5432,
    max: 20,
  })
  return pool
}
module.exports = { ConnectionObj }
