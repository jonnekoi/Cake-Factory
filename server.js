const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");

app.post("/submit", (req, res) => {
  // form data is displayed in form-submit.html through express.js server side by the template engine
  res.render("form-submit", {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
});

const PORT = process.env.PORT || 3040;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
