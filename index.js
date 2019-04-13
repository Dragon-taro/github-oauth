const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const request = require("request");
const secret = require("./secret");
const app = express();

// nunjucks view engine
nunjucks.configure("views", {
  autoescape: true,
  express: app
});
// setup view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/login/callback", (req, res) => {
  const { code } = req.query;

  request.post(
    "https://github.com/login/oauth/access_token",
    {
      headers: { Accept: "application/json" },
      json: {
        client_id: "2b122a0e0e50234e6c8a",
        client_secret: secret.CLIENT_SECRET,
        code
      }
    },
    (err, responese, body) => {
      if (!err) {
        res.send(responese);
      } else {
        res.send(err);
      }
    }
  );
});

app.listen(18080);
