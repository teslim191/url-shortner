const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')

const app = express();

// Basic Configuration

dotenv.config({path: './config/config.env'})

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// CORS middleware 
app.use(cors());

connectDB()
// view engine

app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(express.static('public'));





app.use('/api', require('./routes/api'))
app.use('/', require('./routes/index'))


const port = process.env.PORT || 7000;

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
