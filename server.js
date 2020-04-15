const path = require('path');
const express = require('express');
const dotenv = require('./progressivebudget/node_modules/dotenv/types');
const colors = require('./progressivebudget/node_modules/colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./client/routes/transactions');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));