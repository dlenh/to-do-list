// declare variables
const express = require("express");
const app = express();
const PORT = 8500;
const mongoose = require("mongoose");
require("dotenv").config();
// keep private files in dotenv
// add model variable

// middleware helps deal with traffic to/from various endpoints/server
// ejs helps turn javascript into html (rendered in browser)
app.set("view engine", "ejs");

// store css/style files in public folder
app.use(express.static("public"));

