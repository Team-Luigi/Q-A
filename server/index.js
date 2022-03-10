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
    // const id = req.params.product_id;
    // const questions = await pool.query('SELECT * FROM answer_list AS a CROSS JOIN question_list AS q LIMIT 5');
    // res.json(questions.rows);
  // const id = req.params.product_id;
  // const questions = await pool.query('SELECT q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported FROM question_list AS q FULL JOIN answer_list AS a USING (question_id) LIMIT 5');
  // res.json(questions.rows);
  // const id = req.params.product_id;
  // const questions = await pool.query('SELECT q.product_id, q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported FROM question_list AS q WHERE q.product_id = $1 UNION ALL SELECT * FROM answer_list AS a WHERE a.question_id = question_id', [id]);
  // res.json(questions.rows);
  // const questions = await pool.query('SELECT json_build_array((SELECT json_build_object(question_body, body) question_body FROM question_list WHERE id = 1)) results FROM question_list q WHERE id = 1 limit 5');
  // const questions = await pool.query('SELECT *, q.body question_body, json_build_object(id, (SELECT json_agg(a) FROM (SELECT id, body, date_written AS date FROM answer_list WHERE question_id = 1) a)) answers FROM question_list AS q WHERE product_id = 1');
  // const id = req.params.product_id;
  // const questions = await pool.query('SELECT *, q.body question_body, (SELECT json_object_agg(a.id, row_to_json(a)) FROM (SELECT id, body, date_written AS date, answerer_name, helpful AS helpfulness, (SELECT json_agg(p) FROM (SELECT p.url FROM photos AS p WHERE p.answer_id = answer_list.id) p) photos FROM answer_list WHERE question_id = 1) a) answers FROM question_list AS q WHERE product_id = $1', [id]);
  // res.send(questions.rows);
  const id = req.params.product_id;
  const questions = await pool.query('SELECT q.id question_id, q.body question_body, to_timestamp(q.date_written) question_date, q.asker_name, q.helpful question_helpfulness, q.reported, (SELECT json_object_agg(a.id, row_to_json(a)) FROM (SELECT id, body, to_timestamp(date_written) AS date, answerer_name, helpful AS helpfulness, (SELECT json_agg(p.url) FROM photos AS p WHERE p.answer_id = answer_list.id) photos FROM answer_list WHERE question_id = q.id) a) answers FROM question_list AS q WHERE product_id = $1', [id]);
  let results = {
    product_id: id,
    results: questions.rows
  };
  res.send(results);
  // const id = req.params.product_id;
  // const questions = await pool.query('SELECT *, q.body AS question_body, q.date_written AS question_date, q.helpful AS question_helpfulness FROM question_list AS q, answer_list AS a WHERE q.product_id = $1 AND a.question_id = q.id ORDER BY q.id', [id]);
  // res.send(questions.rows);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(418);
  }
})
// SELECT * FROM answer_list AS a NATURAL JOIN question_list AS q LIMIT 5
// asker_name asker_email, reported, helpful
// q.id AS question_id, q.body AS question_body, q.date_written AS question_date, q.asker_name, q.helpful AS question_helpfulness, q.reported
// id, body, date_written, answerer_name, reported, helpful
// a.body AS answer_body, a.reported AS a_report, a.helpful AS a_helpful

// SELECT json_build_object('product_id', $1, 'results', json_build_array(q)) results FROM (SELECT question_list.body question_body FROM question_list) q

app.post('/api/product/questions/:product_id', async (req, res) => {
  // const lastId = await pool.query('SELECT q.id FROM question_list q ORDER BY q.id desc LIMIT 1');
  // console.log('id', lastId.rows[0].id)
  // const nextId = await JSON.parse(lastId.rows[0].id) + 1;
  // console.log(nextId);
  // const date = new Date().getTime();
  // console.log(date);
  try {
    const lastId = await pool.query('SELECT q.id FROM question_list q ORDER BY q.id desc LIMIT 1');
    const nextId = await JSON.parse(lastId.rows[0].id) + 1;
    const date = await new Date().getTime();
    const id = req.params.product_id;
    const question = req.body.body;
    const name = req.body.name;
    const email = req.body.email;
    const query = 'INSERT INTO question_list(id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const createQ = await pool.query(query, [nextId, id, question, date, name, email, 0, 0]);
    // console.log('post test', id, question, name, email);
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
  }
})


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

module.exports = app;