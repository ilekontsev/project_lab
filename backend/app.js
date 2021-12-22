
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dataRoute = require("../backend/route");

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/", dataRoute);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});