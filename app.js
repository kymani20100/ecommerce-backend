const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

// USE CORS BEFORE ANYTHING ELSE
app.use(cors());
app.options("*", cors());

// READ ENV VARIABLES
require('dotenv/config');
const api = process.env.API_URL;
// const connection = process.env.MONGOOSE_CONNECTION;

// IMPORT THE ROUTES
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

// MIDDLEWARE
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

mongoose.connect(process.env.MONGOOSE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop",
})
.then(() => {
    console.log('We are in');
}).catch((e) => {
    console.log(e);
});

app.listen(3000, () => {
    // console.log(api);
    console.log('Server running on port http://localhost:3000');
})