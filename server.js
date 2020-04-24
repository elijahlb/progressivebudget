const path = require('path');
const express = require('express');
// const dotenv = require('./progressivebudget/node_modules/dotenv/types');
// const colors = require('./progressivebudget/node_modules/colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./client/routes/transactions');
const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') { //since we removed config vars we need to add them back
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.get("*",(req,res)=>{
  res.sendFile("index.html",{root:"client/public"});
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));