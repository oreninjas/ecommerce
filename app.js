require('dotenv').config({ path: './.env' });

// Db connection
const connectDB = require('./src/db/db.connection');
connectDB();

const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Importing middlwares
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Importing Routes
const productRoutes = require('./src/routes/products.router');
const userRoutes = require('./src/routes/user.router');

// Executing Routes
app.use('/products', productRoutes);
app.use('/', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is running on port ${port}`);
});

module.exports = { app };
