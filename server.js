const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const cookieSession = require("cookie-session");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4200",
    'https://shop-ui-one.vercel.app', 'https://fast-food-blush.vercel.app']
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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// map routes
const fs = require('fs');
const routePath = './app/routes';
fs.readdirSync(routePath).forEach((file) => {
  if (file.endsWith('.routes.js')) {
    const route = require(`${routePath}/${file}`);
    route(app);
  }
});
// cron Jobs
const cronJobs_restartDB = require('./app/cron-Jobs/restartDB');
cronJobs_restartDB.restartDB();
require("dotenv").config();
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
