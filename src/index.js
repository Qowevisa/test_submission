require('dotenv').config();
const app = require('./app')

app.init();

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
})