import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs" , { check: false});
});


app.post("/submit", (req, res) => {
  const name = req.body.fName;
  const surname = req.body.lName;
  const letterCount = name.trim().length + surname.trim().length;

  res.render("index.ejs", {
    check: true,
    letterCount: letterCount
  });

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
