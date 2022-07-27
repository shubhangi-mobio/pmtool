const mongoose = require("mongoose"); // Mongoose Library
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

// Localhost DB connection using mongodb protocols

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// DB Connection Start

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log("CONNECTION SUCCESSFUL"))
  .catch((err) => console.log(err));

