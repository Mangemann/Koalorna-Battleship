//////////
// CONFIG
// Skapa en express-app (vår server)
const express = require("express")
const app = express()
// express behöver body-parser för att läsa in request body (som json)
const bodyParser = require("body-parser")
app.use(bodyParser.json({limit: "50mb"}))
// porten vi servar på (som i http://localhost:3000 )
const port = 3000

// Konfigurera databasanslutningen
const mysql = require("mysql")
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // ""
  database: "savehighscore"
})
// gör om metoderna connect och query till promise-metoder,
// så vi kan använda async / await:
const util = require("util")
db.connect = util.promisify(db.connect)
db.query = util.promisify(db.query)
// Anslut till databasen
db.connect()

/////////////////
// data routes
// route där front-end hämtar data ifrån databasen
app.get("/data/highscore", async (req, res) => {
  let query = "SELECT * FROM highscore ORDER BY points DESC LIMIT 5"
  let result = await db.query(query)
  res.json(result)
})

// route där front-end skickar data till databasen
app.post("/data/highscore", async (req, res) => {
  console.log("req.body", req.body)
  let query = "INSERT INTO highscore SET name =, points = ?"
  let result = await db.query(query, [req.body.name, req.body.points])
  res.json(result)
})

/////////////////
// FRONTEND files (Inuti client-mappen vill vi lägga vår index.html och kopplade filer (bilder, css, js))
app.use(express.static("./client/"))

// servern startas
app.listen(port, () => {
  console.log("server running on port " + port)
})
