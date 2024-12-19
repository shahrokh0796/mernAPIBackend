const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler  = require("./middleware/errorHandler");
const path = require("path");
const PORT = process.env.PORT || 3500;

// Custome middleware logger
app.use(logger);

// CORS origin Resource sharing
app.use(cors(corsOptions));

// built in middlerware to handle urlencoded data
// in other words, form data
// 'Content-type': "application/x-www.formurlencoded"
app.use(express.urlencoded({ extended: false}));

// builtin middleware for json
app.use(express.json());

// server static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({error: "404 not found"});
    } else {
        res.type("txt").send("404 not found");
    }
});

app.use(errorHandler);


app.listen(PORT, ()=> console.log(`listening on PORT ${PORT}`));