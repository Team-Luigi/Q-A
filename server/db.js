const Pool = require('pg').Pool;
const TOKEN = require('../config.js');

const pool = new Pool({
  user: 'anthonyblelloch',
  host: '3.221.18.111',
  password: TOKEN.TOKEN,
  port: 5432,
  database: 'qna'
});

module.exports = pool;