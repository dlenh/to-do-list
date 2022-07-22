// declare variables
const express = require("express");
const app = express();
const PORT = 8500;
const mongoose = require("mongoose");
require("dotenv").config();
// keep private files in dotenv

// add model variable
const TodoTask = require("./models/todotask");

// middleware helps deal with traffic to/from various endpoints/server
// ejs helps turn javascript into html (rendered in browser)
app.set("view engine", "ejs");

// store css/style (static) files in public folder
app.use(express.static("public"));
app.use(express.urlencoded({extended: true})); // url parser

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log(`Connected to db!`)}
);

app.get("/", async (req, res) => {
    try {
        res.render("index.ejs")
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

// set up server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

