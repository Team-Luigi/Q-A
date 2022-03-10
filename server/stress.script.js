import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 150,
  duration: '15s',
};



export default function () {
  const id = Math.floor(Math.random() * 1000011);
  const url = `http://localhost:3000/api/product/questions/${id}`;
  http.get(url);
  sleep(1);
}