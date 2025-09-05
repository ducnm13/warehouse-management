const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const app = express();
const port = 3000;

const route = require("./routes");

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "/resources/public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/resources/views"));

route(app);

app.listen(port, () =>
  console.log(`App is running at http://localhost:${port}`)
);
