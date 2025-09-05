require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const app = express();
const mysql = require("mysql2/promise");
const port = 3000;

// Connect Database
async function connectDB() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log("✅ Connected to MySQL");
  const [rows] = await connection.execute("SELECT * FROM tbl_nhanvien");
  console.log(rows);
}

connectDB();
// end

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
