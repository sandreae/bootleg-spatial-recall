const path = require('path');
const supertest = require('supertest');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

require(path.resolve(__dirname, '../db'));
const app = require(path.resolve(__dirname, '../app')); // Link to your server file

const request = supertest(app);

it('works with async/await', async (done) => {
  const response = await request.get('/api/impulses');

  expect(response.status).toBe(200);
  done();
});
