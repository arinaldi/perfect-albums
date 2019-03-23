const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 3001;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port: ${PORT}`);
    });
  });
