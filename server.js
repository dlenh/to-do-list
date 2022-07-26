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

// get method
app.get("/", async (req, res) => {
    try {
        TodoTask.find({}, (err,tasks) => {
            res.render("index.ejs", {
                todoTasks: tasks
            })
        }) // render ejs along with list of tasks from db
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

// post method
app.post("/", async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try {
        await todoTask.save();
        console.log(todoTask);
        res.redirect("/");
    } catch(error) {
        if (error) return res.status(500).send(error);
        res.redirect("/");
    }
})

// edit/update method
app
    .route("/edit/:id") // listening to path with parameter of id
    .get((req, res) => {
        const id = req.params.id
        TodoTask.find({}, (err, tasks) => {
            res.render("edit.ejs", {
                todoTasks:tasks, idTask: id })
            })
        })
    .post((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect("/")
            }
        )
    })


// set up server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

