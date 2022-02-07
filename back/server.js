require("dotenv").config({});
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors({ origin: "http://localhost:8081" }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const DATABASE = require("./app/models");
DATABASE.sequelize.sync({ alter: true });

app.get("/", (req, res) => {
  res.status(201).json({ message: "Examen web 2022 - Enache Razvan" });
});

app.use((error, req, res, next) => {
  console.warn("Error: ", error);
  if (error.type == "redirect") res.redirect("/error");
  else if (error.type == "time-out") res.status(408).send(error);
  else res.status(500).send(error);
});

require("./app/routes/virtualshelf-routes")(app);
require("./app/routes/book-routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
