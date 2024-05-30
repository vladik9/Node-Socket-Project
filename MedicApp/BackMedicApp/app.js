const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
require("./db/db");
app.use(cors());
const medic = require("./controllers/medic");
app.use("/api/medic", medic);


app.get("/", (req, res) => {
  res.send("Hello World!");
});
console.log("\n##########################################");
app.listen(PORT, () => console.log(`App start at ${PORT}`));
console.log("##########################################");