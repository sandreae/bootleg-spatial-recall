const openapi = require('@wesleytodd/openapi');

const oapi = openapi(
  '/api/openapi',
  {
    openapi: '3.0.0',
    info: {
      title: 'Bootleg Spatial Recall API',
      description:
        'API endpoints for bootleg-spatial-audio, bootleg convolution reverb.',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000/api' }],
  },
  { htmlui: 'swagger-ui' },
);

module.exports = oapi;
