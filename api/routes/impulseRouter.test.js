const path = require('path');
const supertest = require('supertest');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Impulse = require(path.resolve(__dirname, '../models/Impulse'));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = require(path.resolve(__dirname, '../app')); // Link to your server file

const request = supertest(app);

let testImpulse;

const mockImpulse = {
  name: 'Test Impulse 2',
  location: 'Manchester',
  gpsLocation: {
    latitidue: 53.435212,
    longitude: -2.316901,
  },
  description: 'Long reverb in M60 underpass.',
  date: '2005-06-07T00:00:00.000Z',
  imageFile:
    'https://bootleg-spatial-recall.fra1.digitaloceanspaces.com/1614086483666-impulse-new-impulse-10.jpeg',
  audioFile:
    'https://bootleg-spatial-recall.fra1.digitaloceanspaces.com/1614086483666-impulse-new-impulse-10.wav',
};

// const mockUser = {
//   email: 'myemail@address.com',
//   password: '12345678',
//   passwordConfirm: '12345678',
// };

beforeAll(async () => {
  const mongoURI = process.env.MONGO_URL + process.env.MONGO_DB;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  await mongoose.connect(mongoURI, options);
});

// Seeds database before each test
beforeEach(async () => {
  testImpulse = await Impulse.create(mockImpulse);
});

// Cleans up database between each test
afterEach(async () => {
  await Impulse.deleteImpulse(testImpulse._id);
});

// Disconnect Mongoose
afterAll(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection =
      mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (error.message === 'ns not found') return;
      if (
        error.message.includes(
          'a background operation is currently running',
        )
      )
        return;
    }
  }
  await mongoose.connection.close();
});

it('Get Impulses and return 200', async (done) => {
  const response = await request.get('/impulses');

  expect(response.status).toBe(200);
  done();
});

it('Get one Impulse and return 200', async (done) => {
  const response = await request.get(`/impulses/${testImpulse._id}`);

  expect(response.status).toBe(200);
  done();
});

it('Should request Users and return 401', async (done) => {
  const response = await request.get('/users');

  expect(response.status).toBe(401);
  done();
});

it('Should request one User and return 401', async (done) => {
  const response = await request.get('/users/2342343242342');

  expect(response.status).toBe(401);
  done();
});
