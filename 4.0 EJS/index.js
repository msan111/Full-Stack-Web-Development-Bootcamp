import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;
var message = "";

function isWeekend(req, res, next) {
    const date =  new Date();
    const day = date.getDay();
    res.locals.message = (day == 0 || day == 6) 
    ? "Hey! It's the weekend, time to have fun! 🎉"
    : "Hey! It's a weekday, time to work hard! 💼";

    next();
}

app.use(isWeekend);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    //res.render("index.ejs", { message: message });
    res.render("index.ejs"); // `res.locals.message` otomatik olarak EJS'e gider
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);

});