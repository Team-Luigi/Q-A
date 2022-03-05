const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const pool = require('./db.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/product/questions', async (req, res) => {
  try {
    const questions = await pool.query('SELECT * FROM question_list LIMIT 1');
    res.json(questions.rows);
    // res.json('test');
  } catch (err) {
    console.error(err.message);
  }
})


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});