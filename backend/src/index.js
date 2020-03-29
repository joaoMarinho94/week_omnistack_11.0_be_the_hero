const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require("./routes");

const app = express();

// cors limita apenas url da aplicação declada acessar o backend
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333, () => {
  console.log("http => ok");
});