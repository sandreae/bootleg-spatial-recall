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

oapi.component('schemas', 'Impulse', swaggerImpulseSchema);
oapi.component('responses', 'ImpulseSuccessResponse', {
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
                items: { $ref: '#/components/schemas/Impulse' },
              },
            },
          },
        },
      },
    },
  },
});
oapi.component('responses', '500Error', {
  description: 'Failure',
  content: {
    'application/json': {
      schema: {
        type: 'object',
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
      },
    },
  },
});
oapi.component('responses', '404Error', {
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
              isOperational: { type: 'boolean', example: true },
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
});

exports.getAllImpulses = oapi.path({
  tags: ['Impulses'],
  summary: 'Get all impulses.',
  description:
    'API endpoint that returns all stored impulses from the database.',
  responses: {
    200: { $ref: '#/components/responses/ImpulseSuccessResponse' },
    // 500: { $ref: '#/components/responses/500Error' },
  },
});

exports.getImpulse = oapi.path({
  tags: ['Impulses'],
  summary: 'Get or modify one impulse by ID.',
  description:
    "API endpoint for getting or modifying an imulse by it's id.",
  responses: {
    200: { $ref: '#/components/responses/ImpulseSuccessResponse' },
    // 404: { $ref: '#/components/responses/404Error' },
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
  },
  responses: {
    201: { $ref: '#/components/responses/ImpulseSuccessResponse' },
    // 404: { $ref: '#/components/responses/404Error' },
    // 500: { $ref: '#/components/responses/500Error' },
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
    200: { $ref: '#/components/responses/ImpulseSuccessResponse' },
    // 404: { $ref: '#/components/responses/404Error' },
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

exports.deleteImpulse = oapi.path({
  tags: ['Impulses'],
  summary: 'Delete one impulse by ID.',
  description: "API endpoint for deleting an imulse by it's id.",
  responses: {
    204: {
      description: 'The resource was deleted successfully.',
    },
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
