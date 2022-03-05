const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const pool = require('./db.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/product/questions/:product_id', async (req, res) => {
  try {
    // const id = req.params.product_id;
    // const questions = await pool.query('SELECT * FROM question_list WHERE product_id = $1 LIMIT 10', [id]);
    // res.json(questions.rows);
    // const id = req.params.product_id;
    // const questions = await pool.query('SELECT *, q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported FROM question_list AS q CROSS JOIN answer_list AS a WHERE q.product_id = $1 LIMIT 100', [id]);
    // res.json(questions.rows);
  //   const id = req.params.product_id;
  //   const questions = await pool.query('SELECT * FROM answer_list AS a CROSS JOIN question_list AS q LIMIT 5');
  //   res.json(questions.rows);
  // const id = req.params.product_id;
  // const questions = await pool.query('SELECT q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported FROM question_list AS q FULL JOIN answer_list AS a USING (question_id) LIMIT 5');
  // res.json(questions.rows);
  // const id = req.params.product_id;
  // const questions = await pool.query('SELECT q.product_id, q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported FROM question_list AS q WHERE q.product_id = $1 UNION ALL SELECT * FROM answer_list AS a WHERE a.question_id = question_id', [id]);
  // res.json(questions.rows);
  // const questions = await pool.query('SELECT json_build_array((SELECT json_build_object(question_body, body) question_body FROM question_list WHERE id = 1)) results FROM question_list q WHERE id = 1 limit 5');
  // const questions = await pool.query('SELECT *, q.body question_body, json_build_object(id, (SELECT json_agg(a) FROM (SELECT id, body, date_written AS date FROM answer_list WHERE question_id = 1) a)) answers FROM question_list AS q WHERE product_id = 1');
  const questions = await pool.query('SELECT *, q.body question_body, (SELECT json_object_agg(a.id, row_to_json(a)) FROM (SELECT id, body, date_written AS date, answerer_name, helpful AS helpfulness, (SELECT json_agg(p) FROM (SELECT url FROM photos WHERE answer_id = 5) p) photos FROM answer_list WHERE question_id = 1) a) answers FROM question_list AS q WHERE product_id = 1');
  res.send(questions.rows);
  } catch (err) {
    console.error(err.message);
  }
})
// SELECT * FROM answer_list AS a NATURAL JOIN question_list AS q LIMIT 5
// asker_name asker_email, reported, helpful
// q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported
// id, body, date_written, answerer_name, reported, helpful
// a.body AS answer_body, a.reported AS a_report, a.helpful AS a_helpful

// SELECT json_build_object('product_id', $1, 'results', json_build_array(q)) results FROM (SELECT question_list.body question_body FROM question_list) q

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});