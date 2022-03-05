const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'anthonyblelloch',
  host: 'localhost',
  port: 5432,
  database: 'qna'
});

module.exports = pool;