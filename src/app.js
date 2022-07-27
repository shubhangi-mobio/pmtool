require("dotenv").config();

const express = require("express");
const cors = require("cors"); //configure the web API's security
const morgan = require("morgan"); //for log HTTP requests and errors
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const skuRouter = require("./routes/sku.routes");
const adminRoute = require("./routes/admin.routes");

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const app = express();

//database connection
require("../config/db");

// MIDDLEWARE

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '100mb',
  extended: true
}));
app.use(cookieParser());
app.use(cors());

// v1 api routes
app.use("/api/user", userRouter);
app.use('/api/auth', authRouter);
app.use('/api/sku',skuRouter);
app.use('/api/admin',adminRoute);


app.get("/home", (req, res) => {
  res.json({ message: "Welcome Promo tool project 🙌" });
});

module.exports = app;
