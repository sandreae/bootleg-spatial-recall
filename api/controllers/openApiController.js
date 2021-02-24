const oapi = require('./../utils/openAPI');

exports.getAllImpulses = oapi.path({
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
                    items: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          example: '60350154a0e30c25cddab650',
                        },
                        name: {
                          type: 'string',
                          example: 'M5 underpass',
                        },
                        location: {
                          type: 'string',
                          example: 'Manchester',
                        },
                        description: {
                          type: 'string',
                          example: 'A long reverberant underpass',
                        },
                        date: {
                          type: 'string',
                          example: '01-12-2020',
                        },
                        imageUrl: {
                          type: 'string',
                          example:
                            'https://my.server-storage.com/1614086483666-m5-underpass.jpeg',
                        },
                        audioUrl: {
                          type: 'string',
                          example:
                            'https://my.server-storage.com/1614086483666-m5-underpass.wav',
                        },
                        createdAt: {
                          type: 'string',
                          example: '1614086483666',
                        },
                        upstringdAt: {
                          type: 'string',
                          example: '1614086483666',
                        },
                        slug: {
                          type: 'string',
                          example: 'm5-underpass',
                        },
                      },
                    },
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

exports.getImpulseById = oapi.path({
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
                  impulse: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string',
                        example: '60350154a0e30c25cddab650',
                      },
                      name: {
                        type: 'string',
                        example: 'M5 underpass',
                      },
                      location: {
                        type: 'string',
                        example: 'Manchester',
                      },
                      description: {
                        type: 'string',
                        example: 'A long reverberant underpass',
                      },
                      date: {
                        type: 'string',
                        example: '01-12-2020',
                      },
                      imageUrl: {
                        type: 'string',
                        example:
                          'https://my.server-storage.com/1614086483666-m5-underpass.jpeg',
                      },
                      audioUrl: {
                        type: 'string',
                        example:
                          'https://my.server-storage.com/1614086483666-m5-underpass.wav',
                      },
                      createdAt: {
                        type: 'string',
                        example: '1614086483666',
                      },
                      upstringdAt: {
                        type: 'string',
                        example: '1614086483666',
                      },
                      slug: {
                        type: 'string',
                        example: 'm5-underpass',
                      },
                      __v: { type: 'integer', example: 0 },
                    },
                  },
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
  },
});
