/* eslint-disable vue/one-component-per-file */
const m2s = require('mongoose-to-swagger');
const User = require('./../models/User');
const Impulse = require('./../models/Impulse');
const oapi = require('./../utils/openAPI');

const swaggerImpulseSchema = m2s(Impulse);
const swaggerUserSchema = m2s(User);

// PARTIALS

const responseUser = {
  type: 'object',
  properties: {
    email: { type: 'string', example: 'myemail@address.com' },
    id: { type: 'string', example: '60350154a0e30c25cddab650' },
  },
  required: ['email', 'id'],
};

swaggerImpulseSchema.example = {
  _id: '60350154a0e30c25cddab650',
  name: 'M60 underpass',
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
  createdAt: '2021-02-23T13:21:24.816Z',
  updatedAt: '2021-02-23T13:21:24.816Z',
  slug: 'm60-underpass',
};

swaggerUserSchema.example = {
  _id: '60350154a0e30c25cddab650',
  email: 'myemail@address.com',
};

// COMPONENTS
// schemas
oapi.component('schemas', 'Impulse', swaggerImpulseSchema);
oapi.component('schemas', 'User', swaggerUserSchema);
const error = {
  title: 'ProdError',
  type: 'object',
  properties: {
    status: { type: 'string', example: 'failure.' },
    message: { type: 'string', example: 'Resource not found.' },
  },
  required: ['status', 'message'],
};

// responses
oapi.component('responses', 'SuccessDelete', {
  description: 'Succesfully deleted resource.',
  content: {
    'application/json': {},
  },
});
oapi.component('responses', 'Impulses', {
  description: 'Succesfully respond with an array of all impulses.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'Success' },
          results: { type: 'integer', example: 1 },
          impulses: {
            type: 'array',
            items: { $ref: '#/components/schemas/Impulse' },
          },
        },
        required: ['status', 'impulses', 'results'],
      },
    },
  },
});
oapi.component('responses', 'Impulse', {
  description: 'Succesfully respond with one impulses.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'Success' },
          impulse: { $ref: '#/components/schemas/Impulse' },
        },
        required: ['status', 'impulse'],
      },
    },
  },
});
oapi.component('responses', 'Users', {
  description: 'Succesfully respond with an array of all users.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'Success' },
          results: { type: 'integer', example: 1 },
          users: {
            type: 'array',
            items: responseUser,
          },
        },
        required: ['status', 'users', 'results'],
      },
    },
  },
});
oapi.component('responses', 'User', {
  description: 'Succesfully respond with one user.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'Success' },
          user: responseUser,
        },
        required: ['status', 'user'],
      },
    },
  },
});

oapi.component('responses', 'JwtResponse', {
  description: 'Succesfully authenticated user, returns jwt token.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'success' },
          token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          },
          user: responseUser,
        },
        required: ['status', 'token', 'user'],
      },
    },
  },
});

// requestBodies
oapi.component('requestBodies', 'Impulse', {
  description: 'Add an Impulse to the database',
  content: {
    'multipart/form-data': {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'M60 underpass' },
          location: { type: 'string', example: 'Manchester' },
          gpsLat: {
            type: 'string',
            example: '53.435212',
          },
          gpsLon: {
            type: 'string',
            example: '-2.316901',
          },
          description: {
            type: 'string',
            example: 'Long reverb in M60 underpass.',
          },
          date: {
            type: 'string',
            example: '2005-06-07T00:00:00.000Z',
          },
          imageFile: {
            type: 'string',
            format: 'binary',
          },
          audioFile: {
            type: 'string',
            format: 'binary',
          },
        },
        required: [
          'name',
          'location',
          'description',
          'date',
          'imageFile',
          'audioFile',
        ],
      },
    },
  },
});

// errors

oapi.component('responses', '404Error', {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: error,
    },
  },
});

oapi.component('responses', '400Error', {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: error,
    },
  },
});

oapi.component('responses', '401Error', {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: error,
    },
  },
});

oapi.component('responses', '403Error', {
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: error,
    },
  },
});

exports.getAllImpulses = oapi.validPath({
  tags: ['Impulses'],
  summary: 'Get all impulses.',
  description:
    'API endpoint that returns all stored impulses from the database.',
  responses: {
    200: { $ref: '#/components/responses/Impulses' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
});

exports.getImpulse = oapi.path({
  tags: ['Impulses'],
  summary: 'Get or modify one impulse by ID.',
  description: "API endpoint for getting one imulse by it's id.",
  responses: {
    200: { $ref: '#/components/responses/Impulse' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
    // 500: { $ref: '#/components/responses/500Error' },
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'ID of impulse to use',
      required: true,
      schema: {
        type: 'string',
      },
      example: '6035008a676ffc23ca7e408',
      style: 'simple',
    },
  ],
});

exports.postImpulse = oapi.path({
  tags: ['Impulses'],
  summary: 'Post an impulse.',
  description: 'API endpoint to upload new impulses.',
  requestBody: { $ref: '#/components/requestBodies/Impulse' },
  responses: {
    201: { $ref: '#/components/responses/Impulse' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
});

exports.patchImpulse = oapi.path({
  tags: ['Impulses'],
  summary: 'Update an impulse.',
  description: 'API endpoint to update an existing impulse.',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'M60 underpass' },
            location: { type: 'string', example: 'Manchester' },
            gpsLat: {
              type: 'number',
              example: 53.435212,
            },
            gpsLon: {
              type: 'number',
              example: -2.316901,
            },
            description: {
              type: 'string',
              example: 'Long reverb in M60 underpass.',
            },
            date: {
              type: 'string',
              example: '2005-06-07T00:00:00.000Z',
            },
          },
          required: ['name', 'location', 'description', 'date'],
        },
      },
    },
  },
  responses: {
    200: { $ref: '#/components/responses/Impulse' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'ID of impulse to use',
      required: true,
      schema: {
        type: 'string',
      },
      example: '6035008a676ffc23ca7e408',
      style: 'simple',
    },
  ],
});

exports.deleteImpulse = oapi.path({
  tags: ['Impulses'],
  summary: 'Delete one impulse by ID.',
  description: "API endpoint for deleting an imulse by it's id.",
  responses: {
    204: { $ref: '#/components/responses/SuccessDelete' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'ID of impulse to use',
      required: true,
      schema: {
        type: 'string',
      },
      example: '6035008a676ffc23ca7e408',
      style: 'simple',
    },
  ],
});

exports.getUser = oapi.path({
  tags: ['Users'],
  summary: 'Get one user by ID.',
  description:
    'API endpoint for getting an existing user by their id.',
  responses: {
    200: { $ref: '#/components/responses/User' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'ID of user to use',
      required: true,
      schema: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      style: 'simple',
    },
  ],
});

exports.getAllUsers = oapi.path({
  tags: ['Users'],
  summary: 'Get all users.',
  description:
    'API endpoint that returns all existuing users from the database.',
  responses: {
    200: { $ref: '#/components/responses/Users' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    404: { $ref: '#/components/responses/403Error' },
    500: { $ref: '#/components/responses/404Error' },
  },
});

exports.signup = oapi.path({
  tags: ['Auth'],
  summary: 'Post an user.',
  description: 'API endpoint to create a new User.',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'myemail@address.com' },
            password: { type: 'string', example: 'badpassword123' },
            passwordConfirm: {
              type: 'string',
              example: 'badpassword123',
            },
          },
          required: ['email', 'password', 'passwordConfirm'],
        },
      },
    },
  },
  responses: {
    201: { $ref: '#/components/responses/JwtResponse' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
});

exports.login = oapi.path({
  tags: ['Auth'],
  summary: 'Login.',
  description: 'API endpoint login with your username and password.',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'myemail@address.com' },
            password: { type: 'string', example: 'badpassword123' },
          },
        },
      },
    },
  },
  responses: {
    200: { $ref: '#/components/responses/JwtResponse' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
});

exports.deleteUser = oapi.path({
  tags: ['Users'],
  summary: 'Delete one User by ID.',
  description: 'API endpoint for deleting a user by their ID.',
  responses: {
    204: { $ref: '#/components/responses/SuccessDelete' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'ID of User to delete',
      required: true,
      schema: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      style: 'simple',
    },
  ],
});

exports.patchUser = oapi.path({
  tags: ['Users'],
  summary: 'Update a user.',
  description: 'API endpoint to update an existing user.',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user: responseUser,
          },
        },
      },
    },
  },
  responses: {
    200: { $ref: '#/components/responses/User' },
    400: { $ref: '#/components/responses/400Error' },
    401: { $ref: '#/components/responses/401Error' },
    403: { $ref: '#/components/responses/403Error' },
    404: { $ref: '#/components/responses/404Error' },
  },
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'ID of user to update',
      required: true,
      schema: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      style: 'simple',
    },
  ],
});
