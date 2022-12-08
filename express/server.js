const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const subdir = require('./routes/subdir');
//const employees = require('./model/employees');

app.get('/', (req, res) => {
  res.send('hello world');
});

//custom middleware logger

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

//routes cretation
app.use('/subdir', subdir);

//api cretation

//app.use('/employees', employees);
app.use('/register', require('./api/register'));

//thirdparty middleware

app.use(cors());

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//port

app.listen(3500, () => {
  console.log('server is running');
});
