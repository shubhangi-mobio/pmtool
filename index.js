const app = require("./src/app");

const port = process.env.PORT || 3003;

//setup server to listen on port 3003

app.get('/', (req, res) => {
  res.send('Welcome');
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
