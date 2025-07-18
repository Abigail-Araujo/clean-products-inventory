const dotenv = require("dotenv");
dotenv.config();
const {PAGE_URL} = require("./config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const loginRouter = require("./controllers/login");
const usersRouters = require("./controllers/users");
const { userExtractor } = require("./middleware/auth");
const logoutRouter = require("./controllers/logout"); 

// Middleware
app.use(express.json());
app.use(cors({
  origin: PAGE_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use('/stock', userExtractor, express.static(path.resolve('views', 'stock')));
app.use('/entries', userExtractor, express.static(path.resolve('views', 'entries')));
app.use('/exits', userExtractor, express.static(path.resolve('views', 'exits')));
app.use('/orders', userExtractor, express.static(path.resolve('views', 'orders')));
app.use('/deliveryorders', userExtractor, express.static(path.resolve('views', 'deliveryorders')));
app.use('/configproducts', userExtractor, express.static(path.resolve('views', 'configproducts')));
app.use('/img', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve("views", "verify")));

app.use(morgan('tiny'));

// Rutas Backend
app.use("/api/users", usersRouters);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter); 
app.use("/api/products", require("./controllers/products"));
app.use("/api/categories", require("./controllers/categories"));
app.use("/api/presentations", require("./controllers/presentations"));
// app.use("/api/entries", require("./controllers/entries"));
// app.use("/api/exits", require("./controllers/exits"));
// app.use("/api/movementreasons", require("./controllers/movementReasons"));
// app.use("/api/inventorymovements", require("./controllers/inventoryMovements"));



module.exports = app;