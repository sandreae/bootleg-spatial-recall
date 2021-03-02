const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const testSetup = require('./testSetup');
const User = require(path.resolve(__dirname, '../models/User'));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let testUser;

const mockUser = {
  email: 'myemail@address.com',
  password: '12345678',
  passwordConfirm: '12345678',
};

beforeAll(async () => {
  await testSetup.connectDB();
});

// Seeds database before each test
beforeEach(async () => {
  testUser = await User.create(mockUser);
});

// Cleans up database between each test
afterEach(async () => {
  await User.deleteUser(testUser._id);
});

// Disconnect Mongoose
afterAll(async () => {
  await testSetup.disconnectDB('users');
});

it('Should signup one user and return 201 and then login', async (done) => {
  const json = JSON.stringify({
    email: 'rrrrrrubbishemail@address.com',
    password: 'badpassword',
    passwordConfirm: 'badpassword',
  });

  const response = await axios.post(
    'http://localhost:3000/api/auth/signup',
    json,
    {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json',
      },
    },
  );

  await User.deleteUser(response.data.user.id);
  expect(response.status).toBe(201);
  done();
});

it('Should login one user and return 200', async (done) => {
  const response = await axios.post(
    'http://localhost:3000/api/auth/login',
    {
      email: 'myemail@address.com',
      password: '12345678',
    },
  );

  expect(response.status).toBe(200);
  done();
});

it('Should request Users and return 401', async (done) => {
  let error;

  try {
    await axios.get(`http://localhost:3000/api/users`);
  } catch (e) {
    error = e;
  }

  expect(error.response.status).toBe(401);
  done();
});

it('Should login then request Users and return 200', async (done) => {
  const loginResponse = await axios.post(
    'http://localhost:3000/api/auth/signup',
    {
      email: 'validuser@address.com',
      password: '12345678',
      passwordConfirm: '12345678',
    },
  );

  const jwtHeaderConfig = {
    headers: {
      Authorization: 'Bearer ' + loginResponse.data.token,
    },
  };
  const response = await axios.get(
    `http://localhost:3000/api/users/${testUser._id}`,
    jwtHeaderConfig,
  );

  expect(response.status).toBe(200);
  done();
});
