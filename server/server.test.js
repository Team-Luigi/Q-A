const app = require('./index.js');
const supertest = require('supertest');
const request = supertest(app);

const { id } = 5;
it ('Gets the questions for product id 5', async () => {
  const res = await request.get('/api/product/questions/5');
  console.log('test', res.body);
  expect(res.status).toBe(200);
  expect(res.body.results.length).toBe(5);
});