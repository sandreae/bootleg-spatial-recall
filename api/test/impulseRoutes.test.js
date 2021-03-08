const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const testSetup = require('./testSetup');
const Impulse = require(path.resolve(__dirname, '../models/Impulse'));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

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

const mockEditedImpulse = {
  name: 'Test Impulse 2 edited',
  location: 'Manchester',
  gpsLocation: {
    latitidue: 53.435212,
    longitude: -2.316901,
  },
  description: 'Long reverb in M60 underpass.',
  date: '2005-06-07T00:00:00.000Z',
};

beforeAll(async () => {
  await testSetup.connectDB();
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
  await testSetup.disconnectDB('impulses');
});

it('Get Impulses and return 200', async (done) => {
  const response = await axios.get(
    'http://localhost:3000/api/impulses',
  );

  expect(response.status).toBe(200);
  done();
});

it('Get one Impulse and return 200', async (done) => {
  const response = await axios.get(
    `http://localhost:3000/api/impulses/${testImpulse._id}`,
  );

  expect(response.status).toBe(200);
  done();
});

it('Edit one impulse without auth and return 401', async (done) => {
  let error;

  try {
    await axios.patch(
      `http://localhost:3000/api/impulses/${testImpulse._id}`,
      mockEditedImpulse,
    );
  } catch (e) {
    error = e;
  }
  expect(error.response.status).toBe(401);
  done();
});
