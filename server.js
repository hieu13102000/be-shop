const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

app.use(
  cookieSession({
    name: "dinhhieu-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;
const Brand = db.brand;
const Category = db.category;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
// initial() function helps us to create 3 rows in database.
function initial() {
  Role.create({
    roleId: 1,
    roleName: "user"
  });

  Role.create({
    roleId: 2,
    roleName: "moderator"
  });

  Role.create({
    roleId: 3,
    roleName: "admin"
  });

  Brand.create({
    brandId: 1,
    brandName: "guchi"
  });
  Category.create({
    categoryId: 1,
    categoryName: "son"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require("./app/routes/product.routes")(app);
require('./app/routes/auth.routes')(app);
require("dotenv").config();
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});