const express = require('express');
const app = express();
const path = require("path");
const hbs = require('hbs');
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "../templates/")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

// ("views", );
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/weather", (req, res) => {
    res.render("weather");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("*", (req, res) => {
    res.render("error", {
        errorMessage: "Opps ! Page Can't Be Reached"
    });
})

app.listen(port, () => {
    console.log(`Server is Running on Port 8000`);
});