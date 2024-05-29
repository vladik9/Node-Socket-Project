const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
require("./db/db");

const medic = require("./controllers/user");
app.use("/medic", medic);

// const user = require("./users/controler/user_controler");

// //create
// app.post("/user", (req, res) => {
//   const id = req.body.id;
//   const username = req.body.username;
//   user.addUser(id, username);
//   res.status(200).send(`${username} added successfully!`);
// });

// //read
// app.get("/users/", (req, res) => {
//   user.findUsers();
//   res.status(200).send();
// });

// app.get("/user/:id", (req, res) => {
//   const id = req.params.id;
// });
app.get("/", (req, res) => {
  res.send("Hello World!");
});
console.log("\n##########################################");
app.listen(PORT, () => console.log(`App start at ${PORT}`));
console.log("##########################################");