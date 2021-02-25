/* eslint-disable vue/one-component-per-file */
const m2s = require('mongoose-to-swagger');
const Impulse = require('./../models/impulseModel');
const oapi = require('./../utils/openAPI');

const swaggerImpulseSchema = m2s(Impulse);

swaggerImpulseSchema.example = {
  _id: '60350154a0e30c25cddab650',
  name: 'M60 underpass',
  location: 'Manchester',
  gpsLocation: {
    type: 'Point',
    coordinates: [53.435212, -2.316901],
  },
  description: 'Long reverb in M60 underpass.',
  date: '2005-06-07T00:00:00.000Z',
  imageUrl:
    'https://bootleg-spatial-recall.fra1.digitaloceanspaces.com/1614086483666-impulse-new-impulse-10.jpeg',
  audioUrl:
    'https://bootleg-spatial-recall.fra1.digitaloceanspaces.com/1614086483666-impulse-new-impulse-10.wav',
  createdAt: '2021-02-23T13:21:24.816Z',
  updatedAt: '2021-02-23T13:21:24.816Z',
  slug: 'm60-underpass',
};

oapi.component('schema', 'Impulse', swaggerImpulseSchema);

oapi.component('errors', '500', {
  title: '500',
  properties: {
    status: {
      type: 'string',
      example: 'error',
    },
    error: {
      type: 'object',
      properties: {
        stringValue: {
          type: 'string',
          example: '6035008a676ffc23ca7e408',
        },
        kind: {
          type: 'string',
          example: 'ObjectId',
        },
        value: {
          type: 'string',
          example: '6035008a676ffc23ca7e408',
        },
        path: {
          type: 'string',
          example: '_id',
        },
        reason: {
          type: 'object',
          properties: {},
        },
        statusCode: {
          type: 'integer',
          format: 'int32',
          example: '500',
        },
        status: {
          type: 'string',
          example: 'error',
        },
      },
    },
    message: {
      type: 'string',
      example: 'Long error message',
    },
  },
});

exports.getAllImpulses = oapi.validPath({
  tags: ['Impulses'],
  summary: 'Get all impulses.',
  description:
    'API endpoint that returns all stored impulses from the database.',
  responses: {
    200: {
      description: 'success',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'Success' },
              results: { type: 'integer', example: 1 },
              data: {
                type: 'object',
                properties: {
                  impulses: {
                    type: 'array',
                    items: { $ref: '#/components/schema/Impulse' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

exports.getImpulseById = oapi.validPath({
  tags: ['Impulses'],
  summary: 'Get one impulse by ID.',
  description:
    "API endpoint that returns impulses from the database by it's id.",
  responses: {
    200: {
      description: 'Succesful',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'success' },
              data: {
                type: 'object',
                properties: {
                  impulse: { $ref: '#/components/schema/Impulse' },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: 'Failure',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'fail' },
              error: {
                type: 'object',
                properties: {
                  statusCode: { type: 'integer', example: 404 },
                  status: { type: 'string', example: 'fail' },
                  isOperational: { type: 'bool', example: true },
                },
              },
              message: {
                type: 'string',
                example: 'No impulse found with that ID',
              },
              stack: {
                type: 'string',
                example: 'Error: long error message',
              },
            },
          },
        },
      },
    },
    500: {
      description: 'Failure',
      content: {
        'application/json': {
          schema: { $ref: '#/components/errors/500' },
        },
      },
    },
  },
});

exports.postImpulse = oapi.path({
  tags: ['Impulses'],
  summary: 'Post an impulse.',
  description: 'API endpoint to upload new impulses.',
  requestBody: {
    content: {
      'multipart/form-data': {
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
            imageFile: {
              type: 'string',
              format: 'binary',
            },
            impulseFile: {
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
            'impulseFile',
          ],
        },
      },
    },
    encoding: {
      imageFile: {
        contentType: 'image/png, image/jpeg',
      },
    },
  },
  responses: {
    500: {
      description: 'Failure',
      content: {
        'application/json': {
          schema: { $ref: '#/components/errors/500' },
        },
      },
    },
  },
});
