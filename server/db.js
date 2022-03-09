const Pool = require('pg').Pool;
const TOKEN = require('../config.js');

const pool = new Pool({
  user: 'anthonyblelloch',
  host: 'localhost',
  password: TOKEN.TOKEN,
  port: 5432,
  database: 'qna'
});

module.exports = pool;