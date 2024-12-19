const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;


app.get("^/$|index(.html)?", (req, res) => {
    res.sendFile(
      path.join(__dirname, "views", "index.html")
    );
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
});

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(302, "/new-page.html");
});



app.get("/hello(.html)?", (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
}, (req, res) => {
    res.send("hello world");
});

// chaining route handlers

const one = (req, res, next) => {
    console.log("one");
    next();
}

const two = (req, res, next) => {
    console.log("two");
    next();
}

const three = (req, res, next) => {
    console.log("three");
    next();
}

const four = (req, res, next) => {
    console.log("four");
    res.send("Finished");
}

app.get("/chain(.html)?", [one, two, three, four]);

app.get("/*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});





app.listen(
    PORT, 
    () => console.log(`Server running on port ${PORT}`)
);