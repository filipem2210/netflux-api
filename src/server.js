const app = require('./app');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3333;

app.listen(port, host);
