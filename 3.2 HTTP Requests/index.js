import express from 'express';
const app = express();
const port = 3000;

app.get("/", (req,rest) => {
    console.log(req.rawHeaders);
    rest.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});