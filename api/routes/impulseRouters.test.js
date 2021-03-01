// const path = require('path');
// const supertest = require('supertest');
// const dotenv = require('dotenv');
// const Impulse = require(path.resolve(
//   __dirname,
//   '../models/impulseModel',
// ));
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// require(path.resolve(__dirname, '../db'));
// const app = require(path.resolve(__dirname, '../app')); // Link to your server file

// const request = supertest(app);

// let testImpulse;

// beforeAll(() => {
//   return async () => {
//     try {
//       testImpulse = await Impulse.create({
//         name: 'Test Impulse 2',
//         location: 'Manchester',
//         gpsLocation: {
//           latitidue: 53.435212,
//           longitude: -2.316901,
//         },
//         description: 'Long reverb in M60 underpass.',
//         date: '2005-06-07T00:00:00.000Z',
//         imageFile:
//           'https://bootleg-spatial-recall.fra1.digitaloceanspaces.com/1614086483666-impulse-new-impulse-10.jpeg',
//         audioFile:
//           'https://bootleg-spatial-recall.fra1.digitaloceanspaces.com/1614086483666-impulse-new-impulse-10.wav',
//       });
//     } catch (error) {
//       console.log('Error when creating testImpulse: ', error);
//     }
//     return testImpulse;
//   };
// });

// afterAll(() => {
//   return async () => {
//     try {
//       await Impulse.deleteImpulse(testImpulse._id);
//     } catch (error) {
//       console.log('Error when deleting testImpulse: ', error);
//     }
//   };
// });

// it('works with async/await', async (done) => {
//   const response = await request.get('/api/impulses');

//   expect(response.status).toBe(200);
//   done();
// });

// it('should throw an error', async (done) => {
//   const response = await request.get('/api/users');

//   expect(response.status).toBe(401);
//   done();
// });
