const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "mysql-db",
  user: "root",
  password: "rootpassword",
  database: "userdb"
});

db.connect((err) => {
  if (err) console.error("DB connection failed:", err);
  else console.log("Connected to MySQL");
});

// Insert user
app.post("/api/users", (req, res) => {
  const { name, age, mobile } = req.body;
  const sql = "INSERT INTO users (name, age, mobile) VALUES (?, ?, ?)";
  db.query(sql, [name, age, mobile], (err, result) => {
    if (err) return res.status(500).send("DB error");
    res.json({ id: result.insertId, name, age, mobile });
  });
});

// Get users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) return res.status(500).send("DB error");
    res.json(rows);
  });
});

app.listen(5000, () => console.log("Backend running on 5000"));

