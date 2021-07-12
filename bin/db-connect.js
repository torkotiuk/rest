const mongoose = require('mongoose');
require('dotenv').config();
const { DB_HOST } = process.env;

module.exports = mongoose
  .connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connect');
  })
  .catch(err => console.log(err));
