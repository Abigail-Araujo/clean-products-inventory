const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Conectar con MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

// Rutas

// Rutas Frontend

app.use('/', express.static(path.resolve('views', 'index')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/home', express.static(path.resolve('views', 'home')));
app.use('/configproducts', express.static(path.resolve('views', 'configproducts')));
app.use('/entries', express.static(path.resolve('views', 'entries')));
app.use('/stock', express.static(path.resolve('views', 'stock')));
app.use('/exits', express.static(path.resolve('views', 'exits')));
app.use('/orders', express.static(path.resolve('views', 'orders')));
app.use('/deliveryorders', express.static(path.resolve('views', 'deliveryorders')));
app.use('/img', express.static(path.resolve('img')));

app.use(morgan('tiny'));

// Rutas Backend



module.exports = app;