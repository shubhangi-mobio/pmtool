const app = require("./src/app");

const port = process.env.PORT || 3003;

//setup server to listen on port 3003


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
