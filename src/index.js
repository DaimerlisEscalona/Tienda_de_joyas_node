const express = require("express");
const cors = require("cors");
const indexRoutes = require("./Routes/indexRoutes");
const dotenv = require("dotenv");

dotenv.config({ path: "./src/.env" });

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", indexRoutes);

app.use("*", function (req, res) {
  res.send("Error. Intente nuevamente con una ruta correcta.");
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`server is running on port ${PORT}`);
});