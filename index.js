require("dotenv").config();
const config = require("./config");
const normalizePort = require("./lib/normalizePort");
require("express-async-errors");
const initServer = require("./lib/initServer");
const express = require("express");

const app = express();

app.use(express.json());

app.use(require("cors")());

app.use("/api/v1/", require("./routes/url-shortener"));

initServer(config.port, app, normalizePort);
