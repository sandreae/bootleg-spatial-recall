const dotenv = require('dotenv');

dotenv.config();
const app = require('./app');

require('./database/db');

// Export express app
module.exports = { path: '/api', handler: app };

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
