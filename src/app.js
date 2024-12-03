require('dotenv').config({ path: './.env' });

// Db connection
const connectDB = require('./db/db.connection');
connectDB();

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Importing middlwares
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Importing Routes
const homeRedirectRouter = require('./routes/homeRedirect.router');
const productsRouter = require('./routes/products.router');
const loginRouter = require('./routes/login.router');
const logOutRouter = require('./routes/logout.router');
const registerRouter = require('./routes/register.router');

// Executing Routes
app.use('/', homeRedirectRouter);
app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/logout', logOutRouter);
app.use('/register', registerRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is running on port ${port}`);
});

module.exports = { app };
